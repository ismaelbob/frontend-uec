import HimnarioContext from './index'
import { useState, useEffect, useCallback } from 'react'
import Config from '../../config'
import { fetchConAuth } from '../../utils/api'

const getFavoritesKey = () => `favorites_cache_${localStorage.getItem('_id') || 'anonymous'}`
const getPendingKey = () => `favorites_pending_${localStorage.getItem('_id') || 'anonymous'}`

function HimnarioProvider ({children}) {

    const [datos, setDatos] = useState(null)
    const [loading, setLoading] = useState(false)

    const getLocalFavorites = () => {
        try {
            const stored = localStorage.getItem(getFavoritesKey())
            return stored ? JSON.parse(stored) : {}
        } catch {
            return {}
        }
    }

    const saveLocalFavorite = (songId, isFavorite) => {
        try {
            const favorites = getLocalFavorites()
            favorites[songId] = isFavorite
            localStorage.setItem(getFavoritesKey(), JSON.stringify(favorites))
        } catch (error) {
            console.error('Error guardando favorito en localStorage:', error)
        }
    }

    const getPendingFavorites = () => {
        try {
            const stored = localStorage.getItem(getPendingKey())
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    }

    const savePendingFavorite = (songId, action, himnario) => {
        try {
            const pending = getPendingFavorites()
            const existing = pending.find(p => p.songId === songId)
            if (existing) {
                existing.action = action
                existing.timestamp = Date.now()
            } else {
                pending.push({ songId, action, himnario, timestamp: Date.now() })
            }
            localStorage.setItem(getPendingKey(), JSON.stringify(pending))
        } catch (error) {
            console.error('Error guardando pendiente:', error)
        }
    }

    const clearPendingFavorite = (songId) => {
        try {
            const pending = getPendingFavorites().filter(p => p.songId !== songId)
            localStorage.setItem(getPendingKey(), JSON.stringify(pending))
        } catch (error) {
            console.error('Error limpiando pendiente:', error)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const processPendingFavorites = useCallback(async () => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) return

        const pending = getPendingFavorites()
        if (pending.length === 0) return

        for (const item of pending) {
            const method = item.action === 'add' ? 'POST' : 'DELETE'
            const url = `${Config.urlapi}api/songs/${item.himnario}/favorites/${item.songId}`
            
            try {
                await fetchConAuth(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' }
                })
                clearPendingFavorite(item.songId)
            } catch (error) {
                console.error('Error procesando favorito pendiente:', error)
            }
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const handleOnline = () => {
            console.log('Conexión restaurada, procesando favoritos pendientes...')
            processPendingFavorites()
        }
        
        const handleLoginExitoso = () => {
            console.log('Login exitoso, procesando favoritos pendientes...')
            processPendingFavorites()
        }
        
        window.addEventListener('online', handleOnline)
        window.addEventListener('loginExitoso', handleLoginExitoso)
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('loginExitoso', handleLoginExitoso)
        }
    }, [processPendingFavorites])

    const getDatos = async (himnario) => {
        setLoading(true)
        setDatos(null)
        try {
            const response = await fetchConAuth(`${Config.urlapi}api/songs/${himnario}`)
            const data = await response.json()
            
            if (data && data.songs) {
                const localFavorites = getLocalFavorites()
                const updatedSongs = data.songs.map(song => ({
                    ...song,
                    isFavorite: localFavorites[song._id] ?? song.isFavorite
                }))
                data.songs = updatedSongs
            }
            setDatos(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(`Ocurrio un error: ${error}`)
        }
    }
    
    const toggleFavorite = async (himnario, songId, isFavorite) => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) return { ok: false, message: 'No hay sesión activa' }
        
        const newValue = !isFavorite
        const action = newValue ? 'add' : 'remove'

        setDatos(prevDatos => {
            if (!prevDatos || !prevDatos.songs) return prevDatos
            
            const updatedSongs = prevDatos.songs.map(song => 
                song._id === songId || song.idcancion === songId
                    ? { ...song, isFavorite: newValue }
                    : song
            )
            
            return { ...prevDatos, songs: updatedSongs }
        })

        saveLocalFavorite(songId, newValue)

        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'CLEAR_HIMNARIO_CACHE',
                himnario: himnario
            })
        }

        const method = isFavorite ? 'DELETE' : 'POST'
        const url = `${Config.urlapi}api/songs/${himnario}/favorites/${songId}`
        
        // Guardar como pendiente ANTES de hacer el fetch (mientras _id existe en localStorage)
        savePendingFavorite(songId, action, himnario)
        
        try {
            const response = await fetchConAuth(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            const data = await response.json()
            
            if (response.ok && data.ok === true) {
                clearPendingFavorite(songId)
                getDatos(himnario)
                return { ok: true }
            }
            
            // Si la respuesta es 401 pero el favorito ya está guardado como pendiente, retornar éxito
            if (response.status === 401) {
                return { ok: true, offline: true, message: 'Token expirado, se sincronizará al hacer login' }
            }
            
            if (!navigator.onLine) {
                // Ya estaba guardado arriba, retornar éxito
                return { ok: true, offline: true, message: 'Guardado localmente, se sincronizará cuando haya conexión' }
            }
            
            return { ok: false, message: data.message || 'Error al cambiar favorito' }
        } catch (error) {
            console.error('Error toggling favorite:', error)
            
            // El favorito ya está guardado como pendiente gracias al savePendingFavorite arriba
            if (!navigator.onLine) {
                return { ok: true, offline: true, message: 'Guardado localmente, se sincronizará cuando haya conexión' }
            }
            
            return { ok: false, message: 'No se pudo conectar' }
        }
    }
    
    const refreshHimnario = (himnario) => {
        getDatos(himnario)
    }

    return (
        <HimnarioContext.Provider value={{datos, loading, getDatos, refreshHimnario, toggleFavorite}}>
            {children}
        </HimnarioContext.Provider>
    )
}

export default HimnarioProvider
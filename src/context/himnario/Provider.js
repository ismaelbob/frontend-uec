import HimnarioContext from './index'
import { useState } from 'react'
import Config from '../../config'

function HimnarioProvider ({children}) {

    const [datos, setDatos] = useState(null)
    const [loading, setLoading] = useState(false)

    const getDatos = async (himnario) => {
        setLoading(true)
        setDatos(null)
        try {
            const accessToken = localStorage.getItem('accessToken')
            const headers = accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}
            
            await fetch(`${Config.urlapi}api/songs/${himnario}`, { headers })
                .then(response => response.json())
                .then(data => setDatos(data))
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(`Ocurrio un error: ${error}`)
        }
    }
    
    const toggleFavorite = async (himnario, songId, isFavorite) => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) return { ok: false, message: 'No hay sesión activa' }
        
        const method = isFavorite ? 'DELETE' : 'POST'
        const url = `${Config.urlapi}api/songs/${himnario}/favorites/${songId}`
        
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            
            const data = await response.json()
            
            if (response.ok && data.ok === true) {
                setDatos(prevDatos => {
                    if (!prevDatos || !prevDatos.songs) return prevDatos
                    
                    const updatedSongs = prevDatos.songs.map(song => 
                        song._id === songId || song.idcancion === songId
                            ? { ...song, isFavorite: !isFavorite }
                            : song
                    )
                    
                    return { ...prevDatos, songs: updatedSongs }
                })
                
                return { ok: true }
            }
            
            return { ok: false, message: data.message || 'Error al cambiar favorito' }
        } catch (error) {
            console.error('Error toggling favorite:', error)
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
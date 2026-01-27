import TemaContext from './index'
import { useState, useEffect, useCallback } from 'react'

function TemaProvider ({children}) {
    // Estados posibles: 'light', 'dark', 'system'
    const [temaPreferido, setTemaPreferido] = useState(() => {
        // Obtener del localStorage o usar 'system' por defecto
        const guardado = localStorage.getItem('temaPreferido')
        return guardado || 'system'
    })

    // Función para obtener el tema efectivo (light o dark)
    const obtenerTemaEfectivo = useCallback((preferido) => {
        if (preferido === 'system') {
            // Detectar preferencia del sistema
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark'
            }
            return 'light'
        }
        return preferido
    }, [])

    const [temaEfectivo, setTemaEfectivo] = useState(() => obtenerTemaEfectivo(temaPreferido))

    // Función para aplicar el tema al DOM
    const aplicarTema = useCallback((tema) => {
        if (tema === 'dark') {
            document.body.classList.add('dark-theme')
        } else {
            document.body.classList.remove('dark-theme')
        }
    }, [])

    // Función para cambiar el tema
    const cambiarTema = useCallback((nuevoTema) => {
        setTemaPreferido(nuevoTema)
        localStorage.setItem('temaPreferido', nuevoTema)
    }, [])

    // Efecto para aplicar el tema cuando cambia temaPreferido
    useEffect(() => {
        const tema = obtenerTemaEfectivo(temaPreferido)
        setTemaEfectivo(tema)
        aplicarTema(tema)
    }, [temaPreferido, obtenerTemaEfectivo, aplicarTema])

    // Efecto para escuchar cambios en la preferencia del sistema
    useEffect(() => {
        if (temaPreferido === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            
            const handleChange = (e) => {
                const nuevoTema = e.matches ? 'dark' : 'light'
                setTemaEfectivo(nuevoTema)
                
                if (nuevoTema === 'dark') {
                    document.body.classList.add('dark-theme')
                } else {
                    document.body.classList.remove('dark-theme')
                }
            }

            // Escuchar cambios
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', handleChange)
            } else {
                // Fallback para navegadores antiguos
                mediaQuery.addListener(handleChange)
            }

            return () => {
                if (mediaQuery.removeEventListener) {
                    mediaQuery.removeEventListener('change', handleChange)
                } else {
                    mediaQuery.removeListener(handleChange)
                }
            }
        }
    }, [temaPreferido])

    return (
        <TemaContext.Provider value={{
            temaPreferido,
            temaEfectivo,
            cambiarTema
        }}>
            {children}
        </TemaContext.Provider>
    )
}

export default TemaProvider

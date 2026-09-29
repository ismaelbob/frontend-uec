import HomeContext from './index'
import { useState, useEffect, useCallback } from 'react'
import Config from '../../config'

function HomeProvider ({children}) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getDatos = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${Config.urlapi}api/site/home`)
            const result = await response.json()

            if (response.ok && result.ok === true && result.data) {
                setData(result.data)
            } else {
                setError(result.message || 'No se pudieron cargar los datos del sitio')
            }
        } catch (err) {
            console.error('Error cargando datos del sitio:', err)
            setError('No se pudo conectar con el servidor')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getDatos()
    }, [getDatos])

    return (
        <HomeContext.Provider value={{data, loading, error, refresh: getDatos}}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeProvider
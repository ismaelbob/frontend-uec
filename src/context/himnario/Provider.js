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
            await fetch(`${Config.urlapi}api/songs/${himnario}`)
                .then(response => response.json())
                .then(data => setDatos(data))
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(`Ocurrio un error: ${error}`)
        }
    }
    const refreshHimnario = (himnario) => {
        getDatos(himnario)
    }

    return (
        <HimnarioContext.Provider value={{datos, loading, getDatos, refreshHimnario}}>
            {children}
        </HimnarioContext.Provider>
    )
}

export default HimnarioProvider
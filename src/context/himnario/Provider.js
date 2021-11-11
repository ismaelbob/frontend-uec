import HimnarioContext from './index'
import { useState } from 'react'
import Config from '../../config'

function HimnarioProvider ({children}) {

    const [datos, setDatos] = useState([])
    const [estado, setEstado] = useState(false)

    const getDatos = async (himnario) => {
        setEstado(false)
        try {
            await fetch(`${Config.urlapi}/${himnario}/getcanciones.php`)
                .then(response => response.json())
                .then(data => setDatos(data))
            setEstado(true)
        } catch (error) {
            setEstado(false)
            console.log(`Ocurrio un error: ${error}`)
        }
    }

    return (
        <HimnarioContext.Provider value={{datos, estado, getDatos}}>
            {children}
        </HimnarioContext.Provider>
    )
}

export default HimnarioProvider
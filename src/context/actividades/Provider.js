import ActividadesContext from './index'
import { useState } from 'react'

function ActividadesProvider ({children}) {
    const [turnos, setTurnos] = useState([])
    const [turnosJov, setTurnoJov] = useState([])
    const [cargando, setCargando] = useState(true)


    const getDatos = async () => {
        setCargando(true)
        try {
            await fetch('https://uecapi.herokuapp.com/cronograma/getTurnoMensual.php')
                .then(response => response.json())
                .then(data => setTurnos(data))
            await fetch('https://uecapi.herokuapp.com/cronograma/getTurnoJovenes.php')
                .then(response => response.json())
                .then(data => setTurnoJov(data))
            setCargando(false)
        } catch (error) {
            console.log('Ocurrio un error al traer los datos')
        }
    }
    

    return (
        <ActividadesContext.Provider value={{turnosJov, turnos, cargando, getDatos}}>
            {children}
        </ActividadesContext.Provider>
    )
}

export default ActividadesProvider
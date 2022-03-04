import ActividadesContext from './index'
import { useState } from 'react'
import Config from '../../config'

function ActividadesProvider ({children}) {
    const [turnos, setTurnos] = useState([])
    const [turnosJov, setTurnoJov] = useState([])
    const [cargando, setCargando] = useState(true)


    const getDatos = async () => {
        setCargando(true)
        try {
            await fetch(`${Config.urlapi}/cronograma/getTurnoMensual.php`)
                .then(response => response.json())
                .then(data => setTurnos(data))
            await fetch(`${Config.urlapi}/cronograma/getTurnoJovenes.php`)
                .then(response => response.json())
                .then(data => setTurnoJov(data))
            setCargando(false)
        } catch (error) {
            console.log('Ocurrio un error al traer los datos')
        }
    }

    const getSemana = async (idsemana) => {
        setCargando(true)
        try {
            await fetch(`${Config.urlapi}/cronograma/getTurnoSemana.php`, {method: 'POST', body: JSON.stringify(idsemana)})
            .then(response => response.json())

            setCargando(false)
        } catch (error) {
            console.log('Ocurrio un error al traer datos de semana')
        }
    }
    

    return (
        <ActividadesContext.Provider value={{turnosJov, turnos, cargando, getDatos, getSemana}}>
            {children}
        </ActividadesContext.Provider>
    )
}

export default ActividadesProvider
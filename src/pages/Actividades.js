import React, { useState, useEffect } from 'react'
import './styles/actividades.css'
import Cronograma from '../components/Cronograma'
import FormMes from '../components/FormMes'
import Formsemana from '../components/Formsemana'
import Loader from '../components/Loader'

function Actividades () {
    const [turnos, setTurnos] = useState([])
    const [turnosJov, setTurnoJov] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        getDatos()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        //
    }, [turnos])

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

    if (cargando) {
        return(
            <div className="container text-center mt-3">
                <Loader/>
            </div>
        )
    }
    return (
        <div className="container">
            <Cronograma turnoMensual={turnos} turnoJovenes={turnosJov}/>
        </div>
    )
}

export default Actividades
import React from 'react'
import './styles/cronograma.css'
import TurnoMes from './TurnoMes'

function Cronograma ({turnoMensual, turnoJovenes, usuario, nivel, handleClick}) {
    const mes1 = turnoMensual.filter(mes => mes.idmes === 1)
    const mes2 = turnoMensual.filter(mes => mes.idmes === 2)
    const mes3 = turnoMensual.filter(mes => mes.idmes === 3)

    const jov1 = turnoJovenes.filter(mes => mes.idmes === 1)
    const jov2 = turnoJovenes.filter(mes => mes.idmes === 2)
    const jov3 = turnoJovenes.filter(mes => mes.idmes === 3)

    return (
        <div className="mt-2 container">
            <div className="head_titulo my-3">Rol de direccion de culto "Ministerios"</div>
            <TurnoMes datosSemana={mes1} datosJovenes={jov1} nomMes={mes1[0].nom_mes} user={usuario} level={nivel}/>
            <TurnoMes datosSemana={mes2} datosJovenes={jov2} nomMes={mes2[0].nom_mes} user={usuario} level={nivel}/>
            <TurnoMes datosSemana={mes3} datosJovenes={jov3} nomMes={mes3[0].nom_mes} user={usuario} level={nivel}/>
        </div>
    )
}

export default Cronograma
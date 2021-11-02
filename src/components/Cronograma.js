import React from 'react'
import './styles/cronograma.css'
import msec from '../img/menu_sec.svg'

function Cronograma ({turnoMensual, turnoJovenes}) {
    return (
        <div className="mt-2 container">
            <div className="text-center">Noviembre</div>
            <div className="d-flex row text-center cronograma_head">
                <div className="col-5">Ministerio</div>
                <div className="col-7 cron_week">
                    <div>Dom</div>
                    <div>Mar</div>
                    <div>Jue</div>
                    <div className="btn-edit-month" data-toggle="modal" data-target="#modal-edit-month"><img src={msec} alt=":"/></div>
                </div>
            </div>
            {
                turnoMensual.map(semana => {
                    return (
                        <div className="d-flex row text-center cronograma_row" key={semana.idsemana}>
                            <div className="col-5 d-flex justify-content-start align-items-center">{semana.nom_grupo}</div>
                            <div className="col-7 cron_week">
                                <div className="cronograma_row-day"><div style={{background: semana.color_grupo}}>{semana.domingo.substr(8,2)}</div></div>
                                <div className="cronograma_row-day"><div style={{background: semana.color_grupo}}>{semana.martes.substr(8,2)}</div></div>
                                <div className="cronograma_row-day"><div style={{background: semana.color_grupo}}>{semana.jueves.substr(8,2)}</div></div>
                                <div className="btn-edit" data-toggle="modal" data-target="#modal-edit"><img src={msec} alt=":"/></div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="d-flex row text-center cronograma_foot pb-2">
                <div className="col-12">Sabados</div>
            {
                turnoJovenes.map(semana => {
                    return (
                        <div key={semana.idsemana_jov} className="col-6 col-md-3 mb-1 mb-md-0 cronograma_row-week"><div style={{background: semana.color_grupo}}>{semana.fecha.substr(8,2)}{' ' + semana.nom_grupo}</div></div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Cronograma
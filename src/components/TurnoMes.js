import React from "react"
import { Link } from "react-router-dom"
import IconEdit from '../img/menu_sec.svg'

function TurnoMes ({datosSemana, datosJovenes, nomMes, user, level, idMes}) {
    return (
        <>
            <div className="text-center">{nomMes}</div>
            <div className="d-flex row text-center cronograma_head">
                <div className="col-5">Ministerio</div>
                <div className="col-7 cron_week">
                    <div>Dom</div>
                    <div>Mar</div>
                    <div>Jue</div>
                    <div>
                        {
                            user !== '' && level === 'A' ? <Link to={`/actividades/editarmes/${idMes}`}><div className="btn-edit-month"><img src={IconEdit} alt="Edit" width="16px"/></div></Link> : <div></div>
                        }
                    </div>
                </div>
            </div>
            {
                datosSemana.map(semana => {
                    return (
                        <div className="d-flex row text-center cronograma_row" key={semana.idsemana}>
                            <div className="col-5 d-flex justify-content-start align-items-center">{semana.nom_grupo}</div>
                            <div className="col-7 cron_week">
                                <div className="cronograma_row-day"><div style={{background: semana.color_grupo}}>{semana.domingo.substr(8,2)}</div></div>
                                <div className="cronograma_row-day"><div style={{background: semana.color_grupo}}>{semana.martes.substr(8,2)}</div></div>
                                <div className="cronograma_row-day"><div style={{background: semana.color_grupo}}>{semana.jueves.substr(8,2)}</div></div>
                                <div>
                                    {
                                        user !== '' && level === 'A' ? <Link to={`/actividades/editarsemana/${semana.idsemana}`}><div className="submenu"><img src={IconEdit} alt="Edit" width="16px"/></div></Link> : <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="d-flex row text-center cronograma_foot pb-3 mb-4">
                <div className="col-12">Sabados</div>
            {
                datosJovenes.map(semana => {
                    return (
                        <div key={semana.idsemana_jov} className="col-6 col-md-3 mb-1 mb-md-0 cronograma_row-week">
                            <div style={{background: semana.color_grupo}}>
                                {semana.fecha.substr(8,2)}{' ' + semana.nom_grupo}
                                <Link to={`actividades/editarsemanajov/${semana.idsemana_jov}`}><div className="submenu"><img src={IconEdit} alt="Edit" width="16px"/></div></Link> 
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </>
    )
}

export default TurnoMes
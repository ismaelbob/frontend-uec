import React from "react"

function TurnoMes ({datosSemana, datosJovenes, nomMes}) {
    return (
        <>
            <div className="text-center">{nomMes}</div>
            <div className="d-flex row text-center cronograma_head">
                <div className="col-5">Ministerio</div>
                <div className="col-7 cron_week">
                    <div>Dom</div>
                    <div>Mar</div>
                    <div>Jue</div>
                    <div></div>
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
                                <div></div>
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
                        <div key={semana.idsemana_jov} className="col-6 col-md-3 mb-1 mb-md-0 cronograma_row-week"><div style={{background: semana.color_grupo}}>{semana.fecha.substr(8,2)}{' ' + semana.nom_grupo}</div></div>
                    )
                })
            }
            </div>
        </>
    )
}

export default TurnoMes
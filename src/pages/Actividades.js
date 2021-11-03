import React, { useContext, useEffect } from 'react'
import './styles/actividades.css'
import Cronograma from '../components/Cronograma'
import FormMes from '../components/FormMes'
import Formsemana from '../components/Formsemana'
import Loader from '../components/Loader'
import ActividadesContext from '../context/actividades'

function Actividades () {
    const {cargando, turnosJov, turnos, getDatos} = useContext(ActividadesContext)

    useEffect(() => {
        getDatos()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        //
    }, [turnos])

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

            <div className="modal fade" id="modal-edit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Semana</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Formsemana/>
                    </div>
                    <div className="modal-footer">
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modal-edit-month" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Mes</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <FormMes/>
                    </div>
                    <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Actividades
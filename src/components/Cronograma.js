import React from 'react'
import './styles/cronograma.css'
import msec from '../img/menu_sec.svg'
import FormMes from './FormMes'

class Cronograma extends React.Component {
    render () {
        return (
            <div className="mt-2 container">
                <div className="text-center">OCTUBRE</div>
                <div className="d-flex row text-center cronograma_head">
                    <div className="col-5">Ministerio</div>
                    <div className="col-7 cron_week">
                        <div>Dom</div>
                        <div>Mar</div>
                        <div>Jue</div>
                        <div className="btn-edit-month" data-toggle="modal" data-target="#modal-edit-month"><img src={msec} alt=":"/></div>
                    </div>
                </div>
                <div className="d-flex row text-center cronograma_row">
                    <div className="col-5 d-flex justify-content-start align-items-center">Cuerdas</div>
                    <div className="col-7 cron_week">
                        <div className="cronograma_row-day"><div>3</div></div>
                        <div className="cronograma_row-day"><div>7</div></div>
                        <div className="cronograma_row-day"><div>9</div></div>
                        <div className="btn-edit" data-toggle="modal" data-target="#modal-edit"><img src={msec} alt=":"/></div>
                    </div>
                </div>
                <div className="d-flex row text-center cronograma_row">
                    <div className="col-5 d-flex justify-content-start align-items-center">Ismael</div>
                    <div className="col-7 cron_week">
                        <div className="cronograma_row-day1"><div>11</div></div>
                        <div className="cronograma_row-day1"><div>12</div></div>
                        <div className="cronograma_row-day1"><div>15</div></div>
                        <div className="btn-edit" data-toggle="modal" data-target="#modal-edit"><img src={msec} alt=":"/></div>
                    </div>
                </div>
                <div className="d-flex row text-center cronograma_row">
                    <div className="col-5 d-flex justify-content-start align-items-center">Even-Ezer</div>
                    <div className="col-7 cron_week">
                        <div className="cronograma_row-day2"><div>11</div></div>
                        <div className="cronograma_row-day2"><div>12</div></div>
                        <div className="cronograma_row-day2"><div>15</div></div>
                        <div className="btn-edit" data-toggle="modal" data-target="#modal-edit"><img src={msec} alt=":"/></div>
                    </div>
                </div>
                <div className="d-flex row text-center cronograma_row">
                    <div className="col-5 d-flex justify-content-start align-items-center">Oriel</div>
                    <div className="col-7 cron_week">
                        <div className="cronograma_row-day3"><div>11</div></div>
                        <div className="cronograma_row-day3"><div>12</div></div>
                        <div className="cronograma_row-day3"><div>15</div></div>
                        <div className="btn-edit" data-toggle="modal" data-target="#modal-edit"><img src={msec} alt=":"/></div>
                    </div>
                </div>
                <div className="d-flex row text-center cronograma_foot pb-2">
                    <div className="col-12">Sabados</div>
                    <div className="col-6 col-md-3 mb-1 mb-md-0 cronograma_row-week"><div>4 Ismael</div></div>
                    <div className="col-6 col-md-3 mb-1 mb-md-0 cronograma_row-week1"><div>10 Even-Ezer</div></div>
                    <div className="col-6 col-md-3 mb-1 mb-md-0 cronograma_row-week"><div>19 Ismael</div></div>
                    <div className="col-6 col-md-3 mb-1 mb-md-0 cronograma_row-week2"><div>26 Oriel</div></div>
                </div>


                <div className="modal fade" id="modal-edit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Semana
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modal-edit-month" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
}

export default Cronograma
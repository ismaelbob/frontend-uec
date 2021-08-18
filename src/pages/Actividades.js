import React from 'react'
import './styles/actividades.css'

class Actividades extends React.Component {
    render () {
        return (
            <div>
                <div className="container mt-3">
                    <div className="head_titulo">ACTIVIDADES PROXIMAS</div>
                    <div className="row mt-2">
                        <div className="col-12 col-md-6">
                            <div className="card mb-3 h-100">
                                <div className="card-header">IGLESIA</div>
                                    <div className="row no-gutters">
                                        <div className="card-body">
                                            <h6 className="card-title text-primary">Titulo</h6>
                                            <p className="card-text">Fecha: <br/> Hora:  <br/>Lugar: </p>
                                            <p className="card-text"><small className="text-muted">-</small></p>
                                        
                                            <div className="separador"></div>

                                            <h6 class="card-title text-primary">Titulo</h6>
                                            <p class="card-text">Fecha: <br/>Hora: <br/>Lugar: </p>
                                            <p class="card-text"><small class="text-muted">-</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="col-12 col-md-6 mt-2 mt-md-0">
                            <div class="card mb-3 h-100">
                                <div className="card-header">MINISTERIO DE ALABANZA</div>
                                <div class="row no-gutters">
                                    <div class="card-body">
                                        <h6 class="card-title text-primary">Practicas de canto</h6>
                                        <p class="card-text">Fechas: Miércoles 4, 11, 18, 25 de agosto <br/>Hora: 19:00 <br/>Lugar: Ambientes de la Iglesia</p>
                                        <p class="card-text"><small class="text-muted">Para cantantes de los ministerios de alabanza.</small></p>

                                        <div className="separador"></div>

                                        <h6 class="card-title text-primary">Taller de teoria musical</h6>
                                        <p class="card-text">Fecha: Lúnes 9 de agosto <br/>Hora: 19:00 <br/>Lugar: Ambientes de la Iglesia</p>
                                        <p class="card-text"><small class="text-muted">Para integrantes de los ministerios de alabanza.</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-3  ">
                    <div className="head_titulo">ROL DE DIRECCION</div>

                    <div className="card mt-2">
                        <h5 className="card-header">Agosto</h5>
                        <div className="card-body">
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Even-Ezer</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3">Domingo 1</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3 my-sm-0 my-1">Martes 3</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3">Jueves 5</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Oriel</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4">Domingo 8</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4 my-sm-0 my-1">Martes 10</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4">Jueves 12</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Pregoneros</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Domingo 15</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1 my-sm-0 my-1">Martes 17</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Jueves 19</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Cuerdas</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Domingo 22</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1 my-sm-0 my-1">Martes 24</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Jueves 26</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Ismael</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g2">Domingo 29</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g2 my-sm-0 my-1">Martes 31</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g2">Jueves 2 Sep</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-4 col-sm-2">Culto de jóvenes</div>
                                <div className="col-8 col-sm-10">
                                    <div className="row">
                                        <div className="col-12 col-sm-3 rounded-pill bg-g2">Sab. 7 Ismael</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g4 my-sm-0 mt-1">Sab. 14 Oriel</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g3 my-sm-0 my-1">Sab. 21 Even-Ezer</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g2 my-sm-0">Sab. 28 Ismael</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-2">
                        <h5 className="card-header">Septiembre</h5>
                        <div className="card-body">
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Hno. Ismael</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4">Domingo 5</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4 my-sm-0 my-1">Martes 7</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4">Jueves 9</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Even-Ezer</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3">Domingo 12</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3 my-sm-0 my-1">Martes 14</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3">Jueves 16</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Pregoneros</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Domingo 19</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1 my-sm-0 my-1">Martes 21</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Jueves 23</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Cuerdas</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Domingo 26</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1 my-sm-0 my-1">Martes 28</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Jueves 30</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-4 col-sm-2">Culto de jóvenes</div>
                                <div className="col-8 col-sm-10">
                                    <div className="row">
                                        <div className="col-12 col-sm-3 rounded-pill bg-g4">Sab. 4 Oriel</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g2 my-sm-0 mt-1">Sab. 11 Ismael</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g3 my-sm-0 my-1">Sab. 18 Even-Ezer</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g4 my-sm-0">Sab. 25 Oriel</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Actividades
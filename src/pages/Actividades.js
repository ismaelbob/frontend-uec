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
                                            <h6 className="card-title text-primary">Bautismo</h6>
                                            <p className="card-text">Fecha: Sábado 1 de mayo <br/> Hora: 8:00 <br/>Lugar: Pairumani</p>
                                            <p className="card-text"><small className="text-muted">Se saldrá a acompañar a los que pasarán por aguas de bautismo.</small></p>
                                        
                                            <div className="separador"></div>

                                            <h6 class="card-title text-primary">Kermesse</h6>
                                            <p class="card-text">Fecha: Domingo 16 de mayo <br/>Hora: 9:00 <br/>Lugar: Canchas "Gemelas"</p>
                                            <p class="card-text"><small class="text-muted">Habrá Pique macho, Pollo al horno, Chicharron y refrescos.</small></p>
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
                                        <p class="card-text">Fechas: Miércoles 2, 9, 16, 23 y 30 de junio <br/>Hora: 19:00 <br/>Lugar: Ambientes de la Iglesia</p>
                                        <p class="card-text"><small class="text-muted">Para cantantes de los ministerios de alabanza.</small></p>

                                        <div className="separador"></div>

                                        <h6 class="card-title text-primary">Taller de teoria musical</h6>
                                        <p class="card-text">Fecha: Lúnes 28 de junio <br/>Hora: 19:00 <br/>Lugar: Ambientes de la Iglesia</p>
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
                        <h5 className="card-header">Junio</h5>
                        <div className="card-body">
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Oriel</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3">Domingo 6</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3 my-sm-0 my-1">Martes 8</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3">Jueves 10</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Hno. Ismael</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4">Domingo 13</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4 my-sm-0 my-1">Martes 15</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4">Jueves 17</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Cuerdas</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Domingo 20</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1 my-sm-0 my-1">Martes 22</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Jueves 24</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Even-Ezer</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g2">Domingo 27</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g2 my-sm-0 my-1">Martes 29</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g2">Jueves 1 de Jul</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-4 col-sm-2">Culto de jóvenes</div>
                                <div className="col-8 col-sm-10">
                                    <div className="row">
                                        <div className="col-12 col-sm-3 rounded-pill bg-g2">Sab. 5 Even-Ezer</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g4 my-sm-0 mt-1">Sab. 12 Ismael</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g3 my-sm-0 my-1">Sab. 19 Oriel</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g2 my-sm-0">Sab. 26 Even-Ezer</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-2">
                        <h5 className="card-header">Julio</h5>
                        <div className="card-body">
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Oriel</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3">Domingo 4</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3 my-sm-0 my-1">Martes 6</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g3">Jueves 8</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Hno. Ismael</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4">Domingo 11</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4 my-sm-0 my-1">Martes 13</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g4">Jueves 15</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Cuerdas</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Domingo 18</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1 my-sm-0 my-1">Martes 20</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g1">Jueves 22</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-5 col-sm-6">Ministerio Even-Ezer</div>
                                <div className="col-7 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 col-sm-4 rounded-pill bg-g2">Domingo 25</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g2 my-sm-0 my-1">Martes 27</div>
                                        <div className="col-12 col-sm-4 rounded-pill bg-g2">Jueves 29</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row border-bottom p-2">
                                <div className="col-4 col-sm-2">Culto de jóvenes</div>
                                <div className="col-8 col-sm-10">
                                    <div className="row">
                                        <div className="col-12 col-sm-3 rounded-pill bg-g4">Sab. 3 Hno. Ismael</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g3 my-sm-0 mt-1">Sab. 10 Oriel</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g2 my-sm-0 my-1">Sab. 17 Even-Ezer</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g4 my-sm-0">Sab. 24 Hno. Ismael</div>
                                        <div className="col-12 col-sm-3 rounded-pill bg-g3 my-sm-0">Sab. 31 Oriel</div>
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
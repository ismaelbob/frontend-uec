import React from 'react'
import img1 from '../img/foto_a.jpg'
import img2 from '../img/foto_b.jpg'
import img3 from '../img/foto_c.jpg'
import img4 from '../img/foto_d.jpg'
import img5 from '../img/foto_e.jpg'
import Footer from '../components/Footer'

class Home extends React.Component {
    render () {
        return (
            <div>
                <div className="container mt-2">
                    <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-ride="carousel">
                        
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={img3} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block bg-transparente-primario">
                                <h5>Union Femenil "LEA"</h5>
                                <p>Uno de sus aniversarios.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={img2} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block bg-transparente-primario">
                                <h5>Union Femenil "LEA"</h5>
                                <p>Otro de sus aniversarios.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={img1} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block bg-transparente-primario">
                                <h5>Culto de estudio biblico</h5>
                                <p>Foto para la Junta que se realizo en la Iglesia</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={img4} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block bg-transparente-primario">
                                <h5>Uniod de jóvenes "Heroes de la Fé"</h5>
                                <p>Uno de sus aniversarios</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={img5} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block bg-transparente-primario">
                                <h5>Union de jóvenes "Heroes de la Fé"</h5>
                                <p>Otro de sus aniversarios</p>
                            </div>
                        </div>
                    </div>
                        <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>

                <div className="container mt-2">
                    <div className="bg-light shadow">
                        <div className="text-primary fs-2 text-center">Bienvenido!</div>
                    </div>
                </div>

                <div className="container my-2">
                    <div className="bg-light p-3">
                        <div className="text-primary fs-3 text-center mb-3">NUESTRAS REUNIONES</div>
                        <div className="row">
                            <div className="col-12 col-md-3 mb-md-0 mb-2">
                                <div className="card text-white bg-info h-100">
                                    <div className="card-header text-center">DOMINGOS</div>
                                    <div className="card-body">
                                        <h5 className="card-title">10:00</h5>
                                        <p className="card-text">Escuela dominical.</p>
                                        <h5 className="card-title">19:00</h5>
                                        <p className="card-text">Culto Central.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-md-0 mb-2">
                                <div className="card text-white bg-info h-100">
                                    <div className="card-header text-center">MARTES</div>
                                    <div className="card-body">
                                        <h5 className="card-title">19:00</h5>
                                        <p className="card-text">Noche de oración.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-md-0 mb-2">
                                <div className="card text-white bg-info h-100">
                                    <div className="card-header text-center">JUEVES</div>
                                    <div className="card-body">
                                        <h5 className="card-title">14:00</h5>
                                        <p className="card-text">Culto de Union Femenil "Lea".</p>
                                        <h5 className="card-title">20:00</h5>
                                        <p className="card-text">Noche de estudio bíblico.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-md-0 mb-2">
                                <div className="card text-white bg-info h-100">
                                    <div className="card-header text-center">SABADO</div>
                                    <div className="card-body">
                                        <h5 className="card-title">19:00</h5>
                                        <p className="card-text">Culto de Union de Jóvenes "Heroes de la Fe"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="bg-light">
                        <div>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d944.720444256612!2d-66.10751173010414!3d-17.447048262684724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sbo!4v1611193718733!5m2!1ses!2sbo" style={{'border': 'none'}} width="100%" height="400" allowFullScreen="" aria-hidden="false" tabIndex="0" title="ubicacion"></iframe>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
}

export default Home
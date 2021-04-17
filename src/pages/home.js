import React from 'react'
import img1 from '../img/foto_a.jpg'
import img2 from '../img/foto_b.jpg'
import img3 from '../img/foto_c.jpg'
import img4 from '../img/foto_d.jpg'
import img5 from '../img/foto_e.jpg'

class Home extends React.Component {
    render () {
        return (
            <div>
                <div className="container mt-2">
                    <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
                        </ol>
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
            </div>
        )
    }
}

export default Home
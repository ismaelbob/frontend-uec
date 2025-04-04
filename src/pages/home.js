import React, {useEffect, useContext} from 'react'
import img1 from '../img/foto_a.jpg'
import img2 from '../img/foto_b.jpg'
import img3 from '../img/foto_c.jpg'
import img4 from '../img/foto_d.jpg'
import img5 from '../img/foto_e.jpg'
import avatar from '../img/avatar.svg'
import './styles/home.css'
import Tarjeta from '../components/Tarjeta'
import Footer from '../components/Footer'
import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'

function Home () {
    const {existeSesion} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)

    useEffect(() => {
        localStorage.setItem('pagina', '1')
        setPage('1')
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }
        // eslint-disable-next-line
    }, [])
    
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
                                    <h5 className="card-title">16:00</h5>
                                    <p className="card-text">Culto Pre Juvenil "Gedeon"</p>
                                    <h5 className="card-title">19:00</h5>
                                    <p className="card-text">Culto de Union de Jóvenes "Heroes de la Fe"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='container'>
                <div className="text-primary fs-3 text-center mb-5 mb-md-3 mt-3">LIDERAZGO 2025</div>
                <div className='tarjetero'>
                    <Tarjeta icono={avatar} nombre="Hno. Zenobio Choque" telefono="67460347" cargo="PASTOR" link={true}/>
                    <Tarjeta icono={avatar} nombre="Hno. Wilson Huallpa" telefono="74534942" cargo="PRIMER DIACONO" link={true}/>
                    <Tarjeta icono={avatar} nombre="Hna. Betty Paulo" telefono="75949508" cargo="DIACONO E. CRISTIANA" link={true}/>
                    <Tarjeta icono={avatar} nombre="Hna. Roxana Ramos" telefono="63919939" cargo="DIACONO TESORERO" link={true}/>
                    <Tarjeta icono={avatar} nombre="Hno. Ismael Jancko" telefono="74376438" cargo="DIACONO SECRETARIO" link={true}/>
                    <Tarjeta icono={avatar} nombre="Hna. Bacilia Gutierres" telefono="74353197" cargo="DIACONO EVANGELISMO" link={true}/>
                    <Tarjeta icono={avatar} nombre="Hno. Natalia Guarachi" telefono="77419809" cargo="DIACONO ACCION SOCIAL" link={true}/>
                    <Tarjeta icono={avatar} nombre="Hna. Nemesia Serrano" telefono="77480383" cargo="DIACONO DE MUSICA" link={true}/>
                    <Tarjeta icono={avatar} nombre="Hna. Elena Toroya" telefono="72231015" cargo="DIACONISA" link={false}/>
                    <Tarjeta icono={avatar} nombre="Hna. Eulalia Serrano" telefono="72231015" cargo="DIACONISA" link={true}/>
                    <Tarjeta icono={avatar} nombre="Hno. Tomas Quispe" telefono="71492803" cargo="D. DE CONSTRUCCION" link={false}/>
                    <Tarjeta icono={avatar} nombre="Hna. Senovia Choque" telefono="72750107" cargo="PRESIDENTA U. FEMENIL" link={true}/>
                    <Tarjeta icono={avatar} nombre="Hno. Ronald Lopez" telefono="63900325" cargo="PRESIDENTE U. JUVENIL" link={true}/>
                    <Tarjeta icono={avatar} nombre="Hna. Jhovana Caceres" telefono="72267426" cargo="DIRECTORA FUNDACION ORIEL" link={true}/>
                </div>
            </div>

            <div className="container">
                <div className="bg-light">
                    <div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4526.425397801151!2d-66.10797133935124!3d-17.447510198296374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc757ed3d4438bb54!2sIglesia%20Evang%C3%A9lica%20Bautista%20%22Unidos%20en%20Cristo%22!5e0!3m2!1sen!2sbo!4v1655604486637!5m2!1sen!2sbo" width="100%" height="400" style={{'border': 'none'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="ubicacion"></iframe>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Home

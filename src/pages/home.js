import React, {useEffect, useContext} from 'react'
import avatar from '../img/avatar.svg'
import placeholder from '../img/placeholder.svg'
import './styles/home.css'
import Tarjeta from '../components/Tarjeta'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'
import HomeContext from '../context/home'
import {urlImagenDrive} from '../utils/driveUrl'

const FOTO_LEADER = 'fotoUrl'

function Home () {
    const {existeSesion} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)
    const {data, loading, error, refresh} = useContext(HomeContext)

    useEffect(() => {
        localStorage.setItem('pagina', '1')
        setPage('1')
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (accessToken && refreshToken) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }
        // eslint-disable-next-line
    }, [])

    if (loading && !data) {
        return (
            <div className="container mt-2 d-flex justify-content-center">
                <Loader/>
            </div>
        )
    }

    if (error && !data) {
        return (
            <div className="container mt-2">
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={refresh}>Reintentar</button>
                </div>
            </div>
        )
    }

    const site = data ? data.site : {}
    const leaders = (data && data.leaders) || []
    const meetings = (data && data.meetings) || []
    const carousel = (data && data.carousel) || []

    const reunionesPorDia = meetings.reduce((agrupadas, reunion) => {
        const dia = reunion.dia || 'OTROS'
        if (!agrupadas[dia]) {
            agrupadas[dia] = []
        }
        agrupadas[dia].push(reunion)
        return agrupadas
    }, {})

    const dias = Object.keys(reunionesPorDia)
    const anioActual = (site && site.anioactual) || new Date().getFullYear()

    return (
        <div>
            <div className="container mt-2">
                <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-ride="carousel">
                <div className="carousel-inner">
                    {carousel.map((img, indice) => (
                        <div key={img._id || indice} className={`carousel-item${indice === 0 ? ' active' : ''}`}>
                            <img
                                src={urlImagenDrive(img.url)}
                                className="d-block w-100"
                                alt={img.titulo || 'Carrusel'}
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    if (!e.target.dataset.fallback) {
                                        e.target.dataset.fallback = 'true'
                                        e.target.src = placeholder
                                    }
                                }}
                            />
                            {(img.titulo || img.descripcion) && (
                                <div className="carousel-caption d-none d-md-block bg-transparente-primario">
                                    {img.titulo && <h5>{img.titulo}</h5>}
                                    {img.descripcion && <p>{img.descripcion}</p>}
                                </div>
                            )}
                        </div>
                    ))}
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
                <div className="bg-surface shadow">
                    <div className="text-primary fs-2 text-center">Bienvenido!</div>
                </div>
            </div>

            {dias.length > 0 && (
            <div className="container my-2">
                <div className="bg-surface p-3">
                    <div className="text-primary fs-3 text-center mb-3">NUESTRAS REUNIONES</div>
                    <div className="row">
                        {dias.map(dia => (
                            <div key={dia} className={`col-12 col-md-${Math.floor(12 / dias.length) || 3} mb-md-0 mb-2`}>
                                <div className="card text-white bg-info h-100">
                                    <div className="card-header text-center">{dia}</div>
                                    <div className="card-body">
                                        {reunionesPorDia[dia].map((reunion, indice) => (
                                            <div key={reunion._id || indice}>
                                                <h5 className="card-title">{reunion.hora}</h5>
                                                <p className="card-text">{reunion.descripcion}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            )}

            {leaders.length > 0 && (
            <div className='container'>
                <div className="text-primary fs-3 text-center mb-5 mb-md-3 mt-3">LIDERAZGO {anioActual}</div>
                <div className='tarjetero'>
                    {leaders.map(leader => (
                        <Tarjeta
                            key={leader._id}
                            icono={leader[FOTO_LEADER] || avatar}
                            nombre={leader.nombre}
                            telefono={leader.telefono || ''}
                            cargo={leader.cargo}
                            link={!!leader.telefono}
                        />
                    ))}
                </div>
            </div>
            )}

            {site.mapaUrl && (
            <div className="container">
                <div className="bg-surface">
                    <div>
                        <iframe src={site.mapaUrl} width="100%" height="400" style={{'border': 'none'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="ubicacion"></iframe>
                    </div>
                </div>
            </div>
            )}

            <Footer/>
        </div>
    )
}

export default Home
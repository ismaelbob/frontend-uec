import React, {useEffect, useContext, useState} from 'react'
import Footer from '../components/Footer'
import './styles/cancionero.css'
import SesionContext from '../context/sesion'
import Loading from '../components/Loader'
import Config from '../config'

function Cancionero () {
    const {existeSesion} = useContext(SesionContext)
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }
        
        if(navigator.onLine) {
            document.getElementById('btn-actualizar-lista').classList.remove('d-none')
        } else {
            document.getElementById('btn-actualizar-lista').classList.add('d-none')
        }
        window.addEventListener('online', () => {
            document.getElementById('btn-actualizar-lista').classList.remove('d-none')
        })
        window.addEventListener('offline', () => {
            document.getElementById('btn-actualizar-lista').classList.add('d-none')
        })
        
        // eslint-disable-next-line
    }, [])

    const actualizarCache = async () => {
        setCargando(true)

        await caches.open('memoria-v1')
                .then(cache => {
                    cache.delete(`${Config.urlapi}/himjovenes/getcanciones.php`)
                        .then(async response => {
                            if(response) {
                                await caches.open('memoria-v1')
                                .then(cache => {
                                    return cache.add(`${Config.urlapi}/himjovenes/getcanciones.php`)
                                })
                            }
                        })
                    cache.delete(`${Config.urlapi}/himpoder/getcanciones.php`)
                    .then(async response => {
                        if(response) {
                            await caches.open('memoria-v1')
                            .then(cache => {
                                return cache.add(`${Config.urlapi}/himpoder/getcanciones.php`)
                            })
                        }
                    })
                    cache.delete(`${Config.urlapi}/himverde/getcanciones.php`)
                        .then(async response => {
                            if(response) {
                                await caches.open('memoria-v1')
                                .then(cache => {
                                    return cache.add(`${Config.urlapi}/himverde/getcanciones.php`)
                                })
                                //window.location.reload()
                            }
                        })
                    setCargando(false)
                    })
    }


    if (cargando) {
        return (
            <div className='container mt-3 d-flex justify-content-center'><Loading/></div>
        )
    }
    return (
        <div className="container screen_principal">
            <div className='mt-3 d-flex justify-content-center'><button onClick={actualizarCache} className="btn btn-primary" id="btn-actualizar-lista">Actualizar lista de canciones</button></div>
            <h4 className="text-center mt-3">HIMNARIOS</h4>
            <div className="row d-flex justify-content-center mb-4">
                <a href="cancionero/himverde">
                    <div className="box_himnarioverde">
                        <div className="box_himnario-title">
                            Verde
                        </div>
                    </div>
                </a>
                <a href="cancionero/himpoder" className="mx-md-4 mx-0 my-4 my-md-0">
                    <div className="box_himnariopoder">
                        <div className="box_himnario-title">
                            Poder
                        </div>
                    </div>
                </a>
                <a href="cancionero/himjovenes">
                    <div className="box_himnariojovenes">
                        <div className="box_himnario-title">
                            Jóvenes
                        </div>
                    </div>
                </a>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="banner col-11 col-md-8 d-flex justify-content-center align-items-center">
                    <p>
                        Cantad alegres a Dios, habitantes de toda la tierra. Salmos 100:1
                    </p>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Cancionero
import React, {useEffect, useContext} from 'react'
import Footer from '../components/Footer'
import './styles/cancionero.css'
import SesionContext from '../context/sesion'

function Cancionero () {
    const {existeSesion} = useContext(SesionContext)

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
        const datosCanciones = [
            'https://uecapi.herokuapp.com/himjovenes/getcanciones.php',
            'https://uecapi.herokuapp.com/himpoder/getcanciones.php',
            'https://uecapi.herokuapp.com/himverde/getcanciones.php',
            'https://uecapi.herokuapp.com/cronograma/getTurnoMensual.php',
            'https://uecapi.herokuapp.com/cronograma/getTurnoJovenes.php'
        ]

        await caches.open('memoria-v1')
                .then(cache => {
                    cache.delete(datosCanciones)
                        .then(async response => {
                            if(response) {
                                await caches.open('memoria-v1')
                                .then(cache => {
                                    return cache.addAll(datosCanciones)
                                })
                                window.location.reload()
                            }
                        })
                    })
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
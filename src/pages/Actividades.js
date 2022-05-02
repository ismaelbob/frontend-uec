import React, { useContext, useEffect, useState} from 'react'
import './styles/actividades.css'
import Cronograma from '../components/Cronograma'
import Loader from '../components/Loader'
import ActividadesContext from '../context/actividades'
import SesionContext from '../context/sesion'
import Footer from '../components/Footer'
import Config from '../config'

function Actividades () {
    const {cargando, turnosJov, turnos, getDatos} = useContext(ActividadesContext)
    const {existeSesion, usuario, nivel} = useContext(SesionContext)
    const [actualizando, setActualizando] = useState(false)

    useEffect(() => {
        getDatos()
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
    useEffect(() => {
        //
    }, [turnos])

    const actualizarCache = async () => {
        setActualizando(true)

        await caches.open('memoria-v1')
                .then(cache => {
                    cache.delete(`${Config.urlapi}/cronograma/getTurnoMensual.php`)
                        .then(async response => {
                            if(response) {
                                await caches.open('memoria-v1')
                                .then(cache => {
                                    return cache.add(`${Config.urlapi}/cronograma/getTurnoMensual.php`)
                                })
                            }
                        })
                    cache.delete(`${Config.urlapi}/cronograma/getTurnoJovenes.php`)
                    .then(async response => {
                        if(response) {
                            await caches.open('memoria-v1')
                            .then(cache => {
                                return cache.add(`${Config.urlapi}/cronograma/getTurnoJovenes.php`)
                            })
                        }
                    })
                    setActualizando(false)
                    })
    }

    if (actualizando) {
        return (
            <div className='container mt-3 d-flex justify-content-center'><Loader/></div>
        )
    }

    if (cargando) {
        return(
            <div className="container text-center mt-3">
                <Loader/>
            </div>
        )
    }
    return (
        <div className="container">
            <Cronograma turnoMensual={turnos} turnoJovenes={turnosJov} usuario={usuario} nivel={nivel}/>
            <div className='mt-3 d-flex justify-content-center'><button onClick={actualizarCache} className="btn btn-primary" id="btn-actualizar-lista">Actualizar lista de turno</button></div>
            <Footer/>
        </div>
    )
}

export default Actividades
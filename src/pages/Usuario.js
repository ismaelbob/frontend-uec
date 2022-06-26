import React, { useContext, useState, useEffect } from 'react'
import './styles/login.css'
import Loader from '../components/Loader'
import Formlogin from '../components/Formlogin'
import Config from '../config'

import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'

function Usuario (props) {
    const [datos, setDatos] = useState({usuario: '', pass: ''})
    const [cargando, setCargando] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const {iniciarSesion, nombre, cerrarSesion, existeSesion} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)

    useEffect(() => {
        localStorage.setItem('pagina', '4')
        setPage('4')
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            setCargando(true)
            const verificar = async () => {
                const consulta = await existeSesion()
                if (consulta === 'correcto') {
                    setMensaje('Bienvenido!')
                } else {
                    setMensaje(consulta)
                }
                setCargando(false)
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

    const handleChange = (event) => {
        setDatos({
                ...datos,
                [event.target.name] : event.target.value,
            }
        )
    }
    const handleSubmitSesion = async (event) => {
        event.preventDefault()
        const form = event.target
        if (datos.usuario === '' || datos.pass === '') {
            form.classList.add('was-validated')
        } else {
            setCargando(true)
            const respuesta = await iniciarSesion(datos)
            if (respuesta === 'correcto') {
                setMensaje('Bienvenido!')
            } else {
                setMensaje(respuesta)
            }
            setCargando(false)
            form.classList.remove('was-validated')
        }
    }

    const salirDeSesion = () => {
        cerrarSesion()
        setMensaje('')
    }

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
                    setCargando(false)
                    })
    }

    if (cargando === true) {
        return (
            <div className="container d-flex justify-content-center mt-2">
                <Loader/>
            </div>
        )
    }

    if (nombre) {
        return (
            <div className="container mt-3 d-flex justify-content-between flex-column">
                <div className="d-flex flex-row justify-content-between mb-3">
                    <div>
                        Bienvenido {nombre}!
                    </div>
                    <div>
                        <button className="btn btn-danger btn-sm" onClick={salirDeSesion}>Cerrar sesion</button>
                    </div>
                </div>
                <div className='border-bottom'></div>
                <div className='mt-3 d-flex justify-content-center'><button onClick={actualizarCache} className="btn btn-primary" id="btn-actualizar-lista">Actualizar datos de la App</button></div>
            </div>
        )
    }

    return (
        <div className="container mt-2 d-flex justify-content-center flex-column align-items-md-center">
            <Formlogin 
                onChange={handleChange}
                onSubmit={handleSubmitSesion}
                datos={datos} 
                mensaje={mensaje}
            />
            <div className='border-bottom w-100'></div>
            <div className='mt-4 d-flex justify-content-center'><button onClick={actualizarCache} className="btn btn-secondary" id="btn-actualizar-lista">Actualizar datos de la App</button></div>
        </div>
    )
}
export default Usuario
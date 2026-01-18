import React, { useContext, useState, useEffect } from 'react'
import './styles/login.css'
import Loader from '../components/Loader'
import Formlogin from '../components/Formlogin'
import Config from '../config'

import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'

function Usuario (props) {
    const [datos, setDatos] = useState({usuario: '', password: ''})
    const [cargando, setCargando] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const {iniciarSesion, nombre, cerrarSesion, existeSesion} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)

    useEffect(() => {
        localStorage.setItem('pagina', '4')
        setPage('4')
        if (localStorage.getItem('user') && localStorage.getItem('password')) {
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
        setCargando(true);
    
        try {
            // Abre la caché 'memoria-v1'
            const cache = await caches.open('memoria-v1');
    
            // Obtén todas las claves almacenadas en la caché
            const keys = await cache.keys();
    
            // Borra cada recurso de la caché
            for (const request of keys) {
                await cache.delete(request);
            }
    
            // Agrega nuevamente los datos actualizados desde la base de datos
            const urlsToCache = [
                `${Config.urlapi}/himjovenes/getcanciones.php`,
                `${Config.urlapi}/himpoder/getcanciones.php`,
                `${Config.urlapi}/himverde/getcanciones.php`
            ];
    
            for (const url of urlsToCache) {
                await cache.add(url);
            }
    
            // Recarga la página para reflejar los datos actualizados
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar la caché:', error);
        } finally {
            setCargando(false);
        }
    };

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
            <div className='mt-4 d-flex justify-content-center'><button onClick={actualizarCache} className="btn btn-secondary" id="btn-actualizar-lista">Actualizar App</button></div>
        </div>
    )
}
export default Usuario
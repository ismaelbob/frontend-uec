import React, { useContext, useState, useEffect } from 'react'
import './styles/login.css'
import Loader from '../components/Loader'
import Formlogin from '../components/Formlogin'
import Config from '../config'

import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'
import TemaContext from '../context/tema'

function Usuario (props) {
    const [datos, setDatos] = useState({usuario: '', password: ''})
    const [cargando, setCargando] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const {iniciarSesion, nombre, cerrarSesion, existeSesion} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)
    const {temaPreferido, cambiarTema} = useContext(TemaContext)

    useEffect(() => {
        localStorage.setItem('pagina', '4')
        setPage('4')
        
        // Verificar si hay tokens antes de verificar sesión
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')

        
        if (accessToken && refreshToken) {
            setCargando(true)
            const verificar = async () => {
                const consulta = await existeSesion()
                if (consulta === 'correcto') {
                    // No mostrar mensaje si la sesión es válida (ya se muestra el nombre)
                    setMensaje('')
                } else {
                    // Solo mostrar mensaje si hay un error
                    setMensaje(consulta)
                }
                setCargando(false)
            }
            verificar()
        } else {
            // Si no hay tokens, asegurarse de que no hay sesión activa
            setCargando(false)
            setMensaje('')
        }

        if(navigator.onLine) {
            document.getElementById('btn-actualizar-lista')?.classList.remove('d-none')
        } else {
            document.getElementById('btn-actualizar-lista')?.classList.add('d-none')
        }
        window.addEventListener('online', () => {
            document.getElementById('btn-actualizar-lista')?.classList.remove('d-none')
        })
        window.addEventListener('offline', () => {
            document.getElementById('btn-actualizar-lista')?.classList.add('d-none')
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
        if (datos.usuario === '' || datos.password === '') {
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

    /**
     * Actualiza manualmente el caché de canciones
     * 1. Limpia el caché existente de canciones
     * 2. Fuerza una nueva petición a la API para obtener datos actualizados
     * 3. Recarga la página para reflejar los cambios
     */
    const actualizarCache = async () => {
        setCargando(true);
    
        try {
            // Verificar que el service worker esté registrado
            if (!('serviceWorker' in navigator)) {
                throw new Error('Service Worker no está disponible en este navegador');
            }

            const registration = await navigator.serviceWorker.ready;
            
            // Crear un canal de mensajes para comunicación con el service worker
            const messageChannel = new MessageChannel();
            
            // Escuchar la respuesta del service worker
            messageChannel.port1.onmessage = (event) => {
                if (event.data.success) {
                    console.log('✅ Caché limpiado exitosamente');
                    
                    // Ahora forzar la actualización de los datos desde la API
                    // Haciendo peticiones fetch que actualizarán el caché automáticamente
                    const urlsToUpdate = [
                        `${Config.urlapi}api/songs/jovenes`,
                        `${Config.urlapi}api/songs/poder`,
                        `${Config.urlapi}api/songs/verde`
                    ];
                    
                    // Hacer peticiones con cache: 'no-store' para forzar actualización
                    Promise.all(
                        urlsToUpdate.map(url => 
                            fetch(url, { 
                                cache: 'no-store',
                                headers: {
                                    'Cache-Control': 'no-cache'
                                }
                            })
                        )
                    ).then(() => {
                        console.log('✅ Datos actualizados desde la API');
                        // Recargar la página para reflejar los cambios
                        window.location.reload();
                    }).catch((error) => {
                        console.error('Error al actualizar datos:', error);
                        setMensaje('Error al actualizar datos. Intenta recargar la página.');
                        setCargando(false);
                    });
                } else {
                    throw new Error(event.data.message || 'Error al limpiar caché');
                }
            };
            
            // Enviar mensaje al service worker para limpiar el caché
            registration.active?.postMessage(
                { type: 'CLEAR_SONGS_CACHE' },
                [messageChannel.port2]
            );
            
        } catch (error) {
            console.error('Error al actualizar la caché:', error);
            setMensaje('Error al actualizar caché. Intenta recargar la página manualmente.');
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

    const handleTemaChange = (event) => {
        cambiarTema(event.target.value)
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
                <div className='mt-3 d-flex flex-column align-items-center'>
                    <div className="mb-3 w-100" style={{maxWidth: '300px'}}>
                        <label htmlFor="select-tema" className="form-label">Tema de la aplicación:</label>
                        <select 
                            id="select-tema"
                            className="form-control" 
                            value={temaPreferido} 
                            onChange={handleTemaChange}
                        >
                            <option value="light">Claro</option>
                            <option value="dark">Oscuro</option>
                            <option value="system">Sistema</option>
                        </select>
                    </div>
                    <button 
                        onClick={actualizarCache} 
                        className="btn btn-primary" 
                        id="btn-actualizar-lista"
                        disabled={!navigator.onLine}
                    >
                        Actualizar datos de la App
                    </button>
                </div>
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
            <div className='mt-4 d-flex flex-column align-items-center'>
                <div className="mb-3 w-100" style={{maxWidth: '300px'}}>
                    <label htmlFor="select-tema-login" className="form-label">Tema de la aplicación:</label>
                    <select 
                        id="select-tema-login"
                        className="form-control" 
                        value={temaPreferido} 
                        onChange={handleTemaChange}
                    >
                        <option value="light">Claro</option>
                        <option value="dark">Oscuro</option>
                        <option value="system">Sistema</option>
                    </select>
                </div>
                <button 
                    onClick={actualizarCache} 
                    className="btn btn-secondary" 
                    id="btn-actualizar-lista"
                    disabled={!navigator.onLine}
                >
                    Actualizar App
                </button>
            </div>
        </div>
    )
}
export default Usuario
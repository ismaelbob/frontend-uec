import React, { useContext, useState, useEffect } from 'react'
import './styles/login.css'
import Loader from '../components/Loader'
import Formlogin from '../components/Formlogin'
import ModalCambiarPassword from '../components/ModalCambiarPassword'
import Config from '../config'
import userIcon from '../img/user.svg'

import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'
import TemaContext from '../context/tema'

function Usuario (props) {
    const [datos, setDatos] = useState({usuario: '', password: ''})
    const [cargando, setCargando] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const {iniciarSesion, nombre, nivel, cerrarSesion, existeSesion, cambiarPassword} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)
    const {temaPreferido, temaEfectivo, cambiarTema} = useContext(TemaContext)
    const [mostrarModal, setMostrarModal] = useState(false)
    const [mensajePassword, setMensajePassword] = useState(null)

    const getNivelTexto = (nivel) => {
        switch(nivel) {
            case 1: return 'Administrador'
            case 2: return 'Estandar'
            case 3: return 'Visor'
            default: return ''
        }
    }

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

    const handleCambiarPassword = async (datos) => {
        const respuesta = await cambiarPassword(datos)
        setMensajePassword(respuesta)
        if (respuesta.ok) {
            setTimeout(() => {
                setMostrarModal(false)
                setMensajePassword(null)
            }, 2000)
        }
    }

    const abrirModalPassword = () => {
        setMensajePassword(null)
        setMostrarModal(true)
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
        const bgColor = temaEfectivo === 'dark' ? '#2d2d2d' : '#d5d5d5'
        const textColor = temaEfectivo === 'dark' ? '#E0E0E0' : '#000000'
        const subtitleColor = temaEfectivo === 'dark' ? '#aaa' : '#666'
        
        return (
            <div className="container mt-3 d-flex justify-content-center">
                <div className="usuario-bloque p-4 d-flex flex-wrap flex-md-nowrap" style={{maxWidth: '1078px', width: '100%', backgroundColor: bgColor, color: textColor, borderRadius: '8px', minHeight: '180px'}}>
                    <div className="d-flex align-items-center" style={{marginRight: '20px'}}>
                        <div className="usuario-avatar d-flex justify-content-center align-items-center w-md-150" style={{width: '100px', height: '100px', borderRadius: '50%', backgroundColor: temaEfectivo === 'dark' ? '#444' : '#e0e0e0', overflow: 'hidden'}}>
                            <img src={userIcon} alt="usuario" style={{width: '60px', height: '60px'}} />
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-between" style={{flex: 1}}>
                        <div>
                            <span style={{fontSize: '24px', fontWeight: 'bold', lineHeight: 1.2}}>{nombre}</span>
                            <span style={{fontSize: '16px', color: subtitleColor, display: 'block', lineHeight: 1.2}}>{getNivelTexto(nivel)}</span>
                        </div>
                        <button 
                            onClick={abrirModalPassword} 
                            style={{background: 'none', border: 'none', color: textColor, textDecoration: 'underline', cursor: 'pointer', padding: 0, alignSelf: 'flex-start'}}
                        >
                            Cambiar contraseña
                        </button>
                    </div>
                    <div className="d-flex flex-row flex-md-column justify-content-between align-items-start align-items-md-end usuario-separador-movil" style={{flex: 1, width: '100%'}}>
                        <div className="d-flex flex-column">
                            <label htmlFor="select-tema" className="form-label" style={{fontSize: '14px', color: textColor, marginBottom: '5px'}}>Tema de aplicación</label>
                            <select 
                                id="select-tema"
                                className="form-control" 
                                value={temaPreferido} 
                                onChange={handleTemaChange}
                                style={{
                                    width: '150px', 
                                    backgroundColor: temaEfectivo === 'dark' ? 'var(--card-bg)' : '#fff', 
                                    color: textColor, 
                                    borderColor: temaEfectivo === 'dark' ? 'var(--border-color)' : '#ced4da'
                                }}
                            >
                                <option value="light">Claro</option>
                                <option value="dark">Oscuro</option>
                                <option value="system">Sistema</option>
                            </select>
                        </div>
                        <div className="d-flex flex-column" style={{marginTop: '26px'}}>
                            <button className="btn btn-danger btn-sm" onClick={salirDeSesion}>Cerrar sesión</button>
                        </div>
                    </div>
                </div>
                <ModalCambiarPassword 
                    show={mostrarModal}
                    onClose={() => setMostrarModal(false)}
                    onSave={handleCambiarPassword}
                    mensaje={mensajePassword}
                />
            </div>
        )
    }

    const textColor = temaEfectivo === 'dark' ? '#E0E0E0' : '#000000'
    
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
                    <label htmlFor="select-tema-login" className="form-label" style={{color: textColor}}>Tema de la aplicación:</label>
                    <select 
                        id="select-tema-login"
                        className="form-control" 
                        value={temaPreferido} 
                        onChange={handleTemaChange}
                        style={{
                            backgroundColor: temaEfectivo === 'dark' ? 'var(--card-bg)' : '#fff', 
                            color: textColor, 
                            borderColor: temaEfectivo === 'dark' ? 'var(--border-color)' : '#ced4da'
                        }}
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
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react'
import './styles/login.css'
import './styles/usuario.css'
import Loader from '../components/Loader'
import Formlogin from '../components/Formlogin'
import ModalCambiarPassword from '../components/ModalCambiarPassword'
import ModalEditarUsuario from '../components/ModalEditarUsuario'
import ModalEliminarUsuario from '../components/ModalEliminarUsuario'
import UsuarioItem from '../components/UsuarioItem'
import UsuarioItemInactivo from '../components/UsuarioItemInactivo'
import BtnaddModal from '../components/BtnaddModal'
import BtnToggleInactivos from '../components/BtnToggleInactivos'
import Config from '../config'
import userIcon from '../img/user.svg'
import Footer from '../components/Footer'

import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'
import TemaContext from '../context/tema'

function Usuario () {
    const [datos, setDatos] = useState({usuario: '', password: ''})
    const [cargando, setCargando] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const {iniciarSesion, nombre, nivel, cerrarSesion, existeSesion, cambiarPassword} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)
    const {temaPreferido, temaEfectivo, cambiarTema} = useContext(TemaContext)
    const [mostrarModal, setMostrarModal] = useState(false)
    const [mensajePassword, setMensajePassword] = useState(null)
    const [usuarios, setUsuarios] = useState([])
    const [cargandoUsuarios, setCargandoUsuarios] = useState(false)
    const [usuarioEditando, setUsuarioEditando] = useState(null)
    const [mensajeEditar, setMensajeEditar] = useState(null)
    const [usuarioEliminando, setUsuarioEliminando] = useState(null)
    const [mostrarModalCrear, setMostrarModalCrear] = useState(false)
    const [mostrarInactivos, setMostrarInactivos] = useState(false)
    const [usuariosInactivos, setUsuariosInactivos] = useState([])
    const [cargandoInactivos, setCargandoInactivos] = useState(false)

    // Refs para almacenar setters - evitan problemas de stale closures en producción
    const setUsuariosRef = useRef(setUsuarios)
    const setUsuariosInactivosRef = useRef(setUsuariosInactivos)

    // Mantener refs actualizados con los setters más recientes
    useEffect(() => {
        setUsuariosRef.current = setUsuarios
    }, [setUsuarios])

    useEffect(() => {
        setUsuariosInactivosRef.current = setUsuariosInactivos
    }, [setUsuariosInactivos])

    const getNivelTexto = (nivel) => {
        switch(nivel) {
            case 1: return 'Administrador'
            case 2: return 'Estandar'
            case 3: return 'Visor'
            default: return ''
        }
    }

    const obtenerUsuarios = useCallback(async () => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const response = await fetch(`${Config.urlapi}api/users`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            })
            const data = await response.json()
            if (data.ok) {
                setUsuariosRef.current(data.users || data)
            }
        } catch (error) {
            console.error('Error al obtener usuarios:', error)
        } finally {
            setCargandoUsuarios(false)
        }
    }, [])

    const obtenerUsuariosInactivos = useCallback(async () => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const response = await fetch(`${Config.urlapi}api/users/admin/inactivos`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            })
            const data = await response.json()
            if (data.ok) {
                setUsuariosInactivosRef.current(data.users || data)
            }
        } catch (error) {
            console.error('Error al obtener usuarios inactivos:', error)
        } finally {
            setCargandoInactivos(false)
        }
    }, [])

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
    }, [existeSesion, setPage, setMensaje])

    const handleChange = (event) => {
        setDatos({
                ...datos,
                [event.target.name] : event.target.value,
            }
        )
    }
    const handleSubmitSesion = useCallback(async (event) => {
        event.preventDefault()
        const form = event.target
        if (datos.usuario === '' || datos.password === '') {
            form.classList.add('was-validated')
        } else {
            setCargando(true)
            const respuesta = await iniciarSesion(datos)
            if (respuesta === 'correcto') {
                setMensaje('')
                setDatos({usuario: '', password: ''})
            } else {
                setMensaje(respuesta)
            }
            setCargando(false)
            form.classList.remove('was-validated')
        }
    }, [datos, iniciarSesion])

    const salirDeSesion = () => {
        cerrarSesion()
        setMensaje('')
    }

    const handleCambiarPassword = useCallback(async (datos) => {
        const respuesta = await cambiarPassword(datos)
        setMensajePassword(respuesta)
        if (respuesta.ok) {
            setTimeout(() => {
                setMostrarModal(false)
                setMensajePassword(null)
                cerrarSesion()
                setDatos({usuario: '', password: ''})
            }, 2000)
        }
    }, [cambiarPassword, cerrarSesion])

    const abrirModalPassword = () => {
        setMensajePassword(null)
        setMostrarModal(true)
    }

    const handleEditarUsuario = useCallback((usuario) => {
        setMensajeEditar(null)
        setUsuarioEditando(usuario)
    }, [])

    const handleGuardarUsuario = useCallback(async (datos) => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            
            const bodyData = {
                nombre: datos.nombre,
                usuario: datos.usuario,
                nivel: parseInt(datos.nivel)
            }
            
            if (datos.password) {
                bodyData.password = datos.password
            }
            
            const response = await fetch(`${Config.urlapi}api/users/${usuarioEditando._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(bodyData)
            })
            const data = await response.json()
            setMensajeEditar(data)
            if (data.ok) {
                setTimeout(() => {
                    setUsuarioEditando(null)
                    setMensajeEditar(null)
                    obtenerUsuarios()
                }, 2000)
            }
        } catch (error) {
            console.error('Error al guardar usuario:', error)
            setMensajeEditar({ ok: false, message: 'Error de conexión' })
        }
    }, [usuarioEditando, obtenerUsuarios])

    const handleEliminarUsuario = useCallback((usuario) => {
        setUsuarioEliminando(usuario)
    }, [])

    const handleCrearUsuario = useCallback(() => {
        setMensajeEditar(null)
        setMostrarModalCrear(true)
    }, [])

    const handleGuardarNuevoUsuario = useCallback(async (datos) => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const response = await fetch(`${Config.urlapi}api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(datos)
            })
            const data = await response.json()
            setMensajeEditar(data)
            if (data.ok) {
                setTimeout(() => {
                    setMostrarModalCrear(false)
                    setMensajeEditar(null)
                    obtenerUsuarios()
                }, 2000)
            }
        } catch (error) {
            console.error('Error al crear usuario:', error)
            setMensajeEditar({ ok: false, message: 'Error de conexión' })
        }
    }, [obtenerUsuarios])

    const handleRestaurarUsuario = useCallback(async (id) => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const response = await fetch(`${Config.urlapi}api/users/${id}/restore`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const data = await response.json()
            if (data.ok) {
                const [usuariosRes, inactivosRes] = await Promise.all([
                    fetch(`${Config.urlapi}api/users`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    }),
                    fetch(`${Config.urlapi}api/users/admin/inactivos`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    })
                ])
                
                const usuariosData = await usuariosRes.json()
                const inactivosData = await inactivosRes.json()
                
                if (usuariosData.ok) setUsuariosRef.current(usuariosData.users || usuariosData)
                if (inactivosData.ok) setUsuariosInactivosRef.current(inactivosData.users || inactivosData)
            } else {
                alert(data.message || 'Error al restaurar usuario')
            }
        } catch (error) {
            console.error('Error al restaurar usuario:', error)
            alert('Error de conexión')
        }
    }, [])

    const toggleInactivos = useCallback(() => {
        if (!mostrarInactivos && usuariosInactivos.length === 0) {
            setCargandoInactivos(true)
            obtenerUsuariosInactivos()
        }
        setMostrarInactivos(!mostrarInactivos)
    }, [mostrarInactivos, usuariosInactivos, obtenerUsuariosInactivos])

    const handleConfirmarEliminar = useCallback(async () => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const response = await fetch(`${Config.urlapi}api/users/${usuarioEliminando._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const data = await response.json()
            if (data.ok) {
                setUsuarioEliminando(null)
                
                const [usuariosRes, inactivosRes] = await Promise.all([
                    fetch(`${Config.urlapi}api/users`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    }),
                    fetch(`${Config.urlapi}api/users/admin/inactivos`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    })
                ])
                
                const usuariosData = await usuariosRes.json()
                const inactivosData = await inactivosRes.json()
                
                if (usuariosData.ok) setUsuariosRef.current(usuariosData.users || usuariosData)
                if (inactivosData.ok) setUsuariosInactivosRef.current(inactivosData.users || inactivosData)
            } else {
                alert(data.message || 'Error al eliminar usuario')
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error)
            alert('Error de conexión')
        }
    }, [usuarioEliminando])

    useEffect(() => {
        if (nombre && nivel === 1) {
            setCargandoUsuarios(true)
            setCargandoInactivos(true)
            obtenerUsuarios()
            obtenerUsuariosInactivos()
        }
    }, [nombre, nivel, obtenerUsuarios, obtenerUsuariosInactivos])


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
            <div className="container mt-3 d-flex flex-column justify-content-center">
                <div>
                    <div className="usuario-bloque p-4 d-flex flex-wrap flex-md-nowrap" style={{width: '100%', backgroundColor: bgColor, color: textColor, borderRadius: '8px', minHeight: '180px'}}>
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
                    <ModalEditarUsuario
                        show={usuarioEditando !== null}
                        onClose={() => setUsuarioEditando(null)}
                        onSave={handleGuardarUsuario}
                        usuario={usuarioEditando}
                        mensaje={mensajeEditar}
                    />
                    <ModalEliminarUsuario
                        show={usuarioEliminando !== null}
                        onClose={() => setUsuarioEliminando(null)}
                        onConfirm={handleConfirmarEliminar}
                        usuario={usuarioEliminando}
                    />
                    <ModalEditarUsuario
                        show={mostrarModalCrear}
                        onClose={() => setMostrarModalCrear(false)}
                        onSave={handleGuardarNuevoUsuario}
                        usuario={null}
                        mensaje={mensajeEditar}
                    />
                    {nivel === 1 && (
                        <div className="mt-4">
                            <div className="barra_menu">
                            <h4 style={{color: textColor, paddingTop: "0.5rem"}}>Lista de usuarios</h4>
                                <div className="barra_menu-buttom">
                                    <div className="barra_menu-buttom-toggle">
                                        <BtnToggleInactivos 
                                            count={usuariosInactivos.length}
                                            onClick={toggleInactivos}
                                            expanded={mostrarInactivos}
                                        />
                                    </div>
                                    <div className="barra_menu-buttom-add">
                                        <BtnaddModal onClick={handleCrearUsuario} />
                                    </div>
                                </div>
                            </div>
                            {cargandoUsuarios ? (
                                <Loader />
                            ) : (
                                <div>
                                    {usuarios.map((usuario, index) => (
                                        <UsuarioItem 
                                            key={usuario._id} 
                                            usuario={usuario} 
                                            indice={index + 1}
                                            onEditar={handleEditarUsuario}
                                            onEliminar={handleEliminarUsuario}
                                        />
                                    ))}
                                </div>
                            )}
                            {mostrarInactivos && (
                                <div className="mt-4">
                                    <h5 className="barra_menu-titulo" style={{color: textColor}}>Usuarios Inactivos</h5>
                                    {cargandoInactivos ? (
                                        <Loader />
                                    ) : (
                                        <div>
                                            {usuariosInactivos.map((usuario, index) => (
                                                <UsuarioItemInactivo 
                                                    key={usuario._id} 
                                                    usuario={usuario} 
                                                    indice={index + 1}
                                                    onRestaurar={handleRestaurarUsuario}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <Footer />
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
            </div>
        </div>
    )
}
export default Usuario
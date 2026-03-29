import React, { useState, useEffect, useContext } from 'react'
import TemaContext from '../context/tema'

const inputStyle = (temaEfectivo) => ({
    backgroundColor: temaEfectivo === 'dark' ? 'var(--input-bg)' : '#FFFFFF',
    color: temaEfectivo === 'dark' ? 'var(--text-color)' : '#000000',
    borderColor: temaEfectivo === 'dark' ? 'var(--input-border)' : '#CED4DA'
})

const modalContentStyle = (temaEfectivo) => ({
    backgroundColor: temaEfectivo === 'dark' ? 'var(--card-bg)' : '#FFFFFF',
    color: temaEfectivo === 'dark' ? 'var(--text-color)' : '#000000',
    border: temaEfectivo === 'dark' ? '1px solid var(--border-color)' : '1px solid rgba(0,0,0,0.2)'
})

function ModalEditarUsuario({ show, onClose, onSave, usuario, mensaje }) {
    const { temaEfectivo } = useContext(TemaContext)
    const [datos, setDatos] = useState({
        nombre: '',
        usuario: '',
        nivel: 2,
        password: '',
        passwordRepetir: ''
    })
    const [error, setError] = useState('')
    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        if (usuario) {
            setDatos({
                nombre: usuario.nombre || '',
                usuario: usuario.usuario || '',
                nivel: usuario.nivel || 2,
                password: '',
                passwordRepetir: ''
            })
        } else {
            setDatos({
                nombre: '',
                usuario: '',
                nivel: 2,
                password: '',
                passwordRepetir: ''
            })
        }
        setError('')
    }, [usuario, show])

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!datos.nombre || !datos.usuario) {
            setError('Nombre y usuario son requeridos')
            return
        }

        const esNuevoUsuario = !usuario

        if (esNuevoUsuario) {
            if (!datos.password || !datos.passwordRepetir) {
                setError('Todos los campos son requeridos')
                return
            }

            if (datos.password !== datos.passwordRepetir) {
                setError('Las contraseñas no coinciden')
                return
            }

            if (datos.password.length < 6) {
                setError('La contraseña debe tener al menos 6 caracteres')
                return
            }
        } else {
            if (datos.password || datos.passwordRepetir) {
                if (datos.password !== datos.passwordRepetir) {
                    setError('Las contraseñas no coinciden')
                    return
                }

                if (datos.password.length < 6) {
                    setError('La contraseña debe tener al menos 6 caracteres')
                    return
                }
            }
        }

        setGuardando(true)
        await onSave({
            nombre: datos.nombre,
            usuario: datos.usuario,
            nivel: datos.nivel,
            password: datos.password || null
        })
        setGuardando(false)
    }

    const handleClose = () => {
        setDatos({ nombre: '', usuario: '', nivel: 2, password: '', passwordRepetir: '' })
        setError('')
        onClose()
    }

    const handleInputFocus = (e) => {
        e.target.style.borderColor = temaEfectivo === 'dark' ? 'var(--primary-text)' : '#007bff'
        e.target.style.boxShadow = '0 0 0 0.2rem rgba(51, 102, 153, 0.25)'
    }

    const handleInputBlur = (e) => {
        e.target.style.borderColor = ''
        e.target.style.boxShadow = 'none'
    }

    if (!show) return null

    const titulo = usuario ? 'Editar Usuario' : 'Nuevo Usuario'

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={handleClose}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div 
                    className="modal-content"
                    style={modalContentStyle(temaEfectivo)}
                >
                    <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <h5 className="modal-title">{titulo}</h5>
                        <button 
                            type="button" 
                            className="close" 
                            onClick={handleClose}
                            style={{ color: 'var(--text-color)' }}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {mensaje && (
                                <div className={`alert ${mensaje.ok ? 'alert-success' : 'alert-danger'}`}>
                                    {mensaje.ok ? mensaje.message : 
                                        mensaje.errors ? mensaje.errors.join(', ') : 
                                        mensaje.message}
                                </div>
                            )}
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    name="nombre"
                                    value={datos.nombre}
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    required
                                    style={inputStyle(temaEfectivo)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="usuario">Usuario:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="usuario"
                                    name="usuario"
                                    value={datos.usuario}
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    required
                                    style={inputStyle(temaEfectivo)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nivel">Nivel:</label>
                                <select
                                    className="form-control"
                                    id="nivel"
                                    name="nivel"
                                    value={datos.nivel}
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    style={inputStyle(temaEfectivo)}
                                >
                                    <option value={1}>Administrador</option>
                                    <option value={2}>Estandar</option>
                                    <option value={3}>Visor</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    Contraseña:
                                    {!usuario && <span className="text-danger"> *</span>}
                                    {usuario && <span className="text-muted"> (opcional)</span>}
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={datos.password}
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    style={inputStyle(temaEfectivo)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordRepetir">
                                    Repetir Contraseña:
                                    {!usuario && <span className="text-danger"> *</span>}
                                    {usuario && <span className="text-muted"> (opcional)</span>}
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordRepetir"
                                    name="passwordRepetir"
                                    value={datos.passwordRepetir}
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    style={inputStyle(temaEfectivo)}
                                />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                        </div>
                        <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)' }}>
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={guardando}>
                                {guardando ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalEditarUsuario

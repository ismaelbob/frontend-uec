import React, { useState, useContext } from 'react'
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

function ModalCambiarPassword({ show, onClose, onSave, mensaje }) {
    const { temaEfectivo } = useContext(TemaContext)
    const [datos, setDatos] = useState({
        passwordActual: '',
        passwordNuevo: '',
        passwordRepetir: ''
    })
    const [error, setError] = useState('')
    const [guardando, setGuardando] = useState(false)

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!datos.passwordActual || !datos.passwordNuevo || !datos.passwordRepetir) {
            setError('Todos los campos son requeridos')
            return
        }

        if (datos.passwordNuevo !== datos.passwordRepetir) {
            setError('Las contraseñas nuevas no coinciden')
            return
        }

        if (datos.passwordNuevo.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        setGuardando(true)
        await onSave({
            passwordActual: datos.passwordActual,
            passwordNuevo: datos.passwordNuevo
        })
        setGuardando(false)
    }

    const handleClose = () => {
        setDatos({ passwordActual: '', passwordNuevo: '', passwordRepetir: '' })
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

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={handleClose}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div 
                    className="modal-content"
                    style={modalContentStyle(temaEfectivo)}
                >
                    <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <h5 className="modal-title">Cambiar Contraseña</h5>
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
                                    {mensaje.message}
                                </div>
                            )}
                            <div className="form-group">
                                <label htmlFor="passwordActual">Contraseña Actual:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordActual"
                                    name="passwordActual"
                                    value={datos.passwordActual}
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    required
                                    style={inputStyle(temaEfectivo)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordNuevo">Nueva Contraseña:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordNuevo"
                                    name="passwordNuevo"
                                    value={datos.passwordNuevo}
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    required
                                    style={inputStyle(temaEfectivo)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordRepetir">Repetir Nueva Contraseña:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordRepetir"
                                    name="passwordRepetir"
                                    value={datos.passwordRepetir}
                                    onChange={handleChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    required
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

export default ModalCambiarPassword

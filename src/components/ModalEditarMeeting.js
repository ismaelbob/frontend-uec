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

function ModalEditarMeeting({ show, onClose, onSave, meeting, mensaje }) {
    const { temaEfectivo } = useContext(TemaContext)
    const [datos, setDatos] = useState({ dia: '', hora: '', descripcion: '', orden: 0 })
    const [error, setError] = useState('')
    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        if (meeting) {
            setDatos({ dia: meeting.dia || '', hora: meeting.hora || '', descripcion: meeting.descripcion || '', orden: meeting.orden || 0 })
        } else {
            setDatos({ dia: '', hora: '', descripcion: '', orden: 0 })
        }
        setError('')
    }, [meeting, show])

    const handleChange = (e) => { setDatos({ ...datos, [e.target.name]: e.target.value }); setError('') }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!datos.dia || !datos.hora || !datos.descripcion) { setError('Día, hora y descripción son obligatorios'); return }
        setGuardando(true)
        await onSave({ ...datos, orden: Number(datos.orden) || 0 })
        setGuardando(false)
    }
    const handleClose = () => { setError(''); onClose() }

    if (!show) return null

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={handleClose}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content" style={modalContentStyle(temaEfectivo)}>
                    <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <h5 className="modal-title">{meeting ? 'Editar Reunión' : 'Nueva Reunión'}</h5>
                        <button type="button" className="close" onClick={handleClose} style={{ color: 'var(--text-color)' }}><span>&times;</span></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {mensaje && (<div className={`alert ${mensaje.ok ? 'alert-success' : 'alert-danger'}`}>{mensaje.ok ? mensaje.message : (mensaje.errors ? mensaje.errors.join(', ') : mensaje.message)}</div>)}
                            <div className="form-group">
                                <label>Día *</label>
                                <input type="text" className="form-control" name="dia" value={datos.dia} onChange={handleChange} style={inputStyle(temaEfectivo)} required />
                            </div>
                            <div className="form-group">
                                <label>Hora *</label>
                                <input type="text" className="form-control" name="hora" value={datos.hora} onChange={handleChange} style={inputStyle(temaEfectivo)} required />
                            </div>
                            <div className="form-group">
                                <label>Descripción *</label>
                                <input type="text" className="form-control" name="descripcion" value={datos.descripcion} onChange={handleChange} style={inputStyle(temaEfectivo)} required />
                            </div>
                            <div className="form-group">
                                <label>Orden (menor = primero)</label>
                                <input type="number" min="0" className="form-control" name="orden" value={datos.orden} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                        </div>
                        <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)' }}>
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
                            <button type="submit" className="btn btn-primary" disabled={guardando}>{guardando ? 'Guardando...' : 'Guardar'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ModalEditarMeeting

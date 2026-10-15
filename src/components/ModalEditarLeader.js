import React, { useState, useEffect, useContext } from 'react'
import TemaContext from '../context/tema'
import ImagenPreview from './home_admin/ImagenPreview'

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

function ModalEditarLeader({ show, onClose, onSave, leader, mensaje }) {
    const { temaEfectivo } = useContext(TemaContext)
    const [datos, setDatos] = useState({ nombre: '', cargo: '', telefono: '', fotoUrl: '', orden: 0 })
    const [error, setError] = useState('')
    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        if (leader) {
            setDatos({ nombre: leader.nombre || '', cargo: leader.cargo || '', telefono: leader.telefono || '', fotoUrl: leader.fotoUrl || '', orden: leader.orden || 0 })
        } else {
            setDatos({ nombre: '', cargo: '', telefono: '', fotoUrl: '', orden: 0 })
        }
        setError('')
    }, [leader, show])

    const handleChange = (e) => { setDatos({ ...datos, [e.target.name]: e.target.value }); setError('') }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!datos.nombre || !datos.cargo) { setError('Nombre y cargo son obligatorios'); return }
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
                        <h5 className="modal-title">{leader ? 'Editar Líder' : 'Nuevo Líder'}</h5>
                        <button type="button" className="close" onClick={handleClose} style={{ color: 'var(--text-color)' }}><span>&times;</span></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {mensaje && (<div className={`alert ${mensaje.ok ? 'alert-success' : 'alert-danger'}`}>{mensaje.ok ? mensaje.message : (mensaje.errors ? mensaje.errors.join(', ') : mensaje.message)}</div>)}
                            <div className="form-group">
                                <label>Nombre *</label>
                                <input type="text" className="form-control" name="nombre" value={datos.nombre} onChange={handleChange} style={inputStyle(temaEfectivo)} required />
                            </div>
                            <div className="form-group">
                                <label>Cargo *</label>
                                <input type="text" className="form-control" name="cargo" value={datos.cargo} onChange={handleChange} style={inputStyle(temaEfectivo)} required />
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input type="text" className="form-control" name="telefono" value={datos.telefono} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                            </div>
                            <div className="form-group">
                                <label>Foto URL (Google Drive)</label>
                                <input type="text" className="form-control" name="fotoUrl" value={datos.fotoUrl} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                                <ImagenPreview url={datos.fotoUrl} alt="Previsualización líder" />
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
export default ModalEditarLeader

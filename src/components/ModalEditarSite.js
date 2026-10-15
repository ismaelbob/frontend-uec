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

function ModalEditarSite({ show, onClose, onSave, site, mensaje }) {
    const { temaEfectivo } = useContext(TemaContext)
    const [datos, setDatos] = useState({
        iglesia: '',
        lema: '',
        logoUrl: '',
        direccion: '',
        mapaUrl: '',
        ciudad: '',
        anioFundacion: '',
        anioactual: '',
        pais: '',
        telefono: '',
        email: '',
        redes: []
    })
    const [redes, setRedes] = useState([])
    const [error, setError] = useState('')
    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        if (site) {
            setDatos({
                iglesia: site.iglesia || '',
                lema: site.lema || '',
                logoUrl: site.logoUrl || '',
                direccion: site.direccion || '',
                mapaUrl: site.mapaUrl || '',
                ciudad: site.ciudad || '',
                anioFundacion: site.anioFundacion || '',
                anioactual: site.anioactual || '',
                pais: site.pais || '',
                telefono: site.telefono || '',
                email: site.email || '',
                redes: site.redes || []
            })
            setRedes((site.redes || []).map((r, idx) => ({ ...r, __id: idx })))
        } else {
            setDatos({
                iglesia: '', lema: '', logoUrl: '', direccion: '', mapaUrl: '', ciudad: '',
                anioFundacion: '', anioactual: '', pais: '', telefono: '', email: '', redes: []
            })
            setRedes([])
        }
        setError('')
    }, [site, show])

    const handleChange = (event) => {
        setDatos({ ...datos, [event.target.name]: event.target.value })
        setError('')
    }

    const handleRedChange = (idx, field, value) => {
        const newRedes = [...redes]
        newRedes[idx][field] = value
        setRedes(newRedes)
    }

    const addRed = () => {
        setRedes([...redes, { nombre: '', url: '', orden: redes.length, __id: Date.now() }])
    }

    const removeRed = (idx) => {
        const newRedes = redes.filter((_, i) => i !== idx)
        setRedes(newRedes)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setGuardando(true)
        const payload = { ...datos }
        if (payload.anioFundacion === '') delete payload.anioFundacion
        if (payload.anioactual === '') delete payload.anioactual
        payload.redes = redes.map(r => ({ nombre: r.nombre, url: r.url, orden: Number(r.orden) || 0 }))
        await onSave(payload)
        setGuardando(false)
    }

    const handleClose = () => {
        setError('')
        onClose()
    }

    if (!show) return null

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={handleClose}>
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content" style={modalContentStyle(temaEfectivo)}>
                    <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <h5 className="modal-title">Editar Configuración del Sitio</h5>
                        <button type="button" className="close" onClick={handleClose} style={{ color: 'var(--text-color)' }}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {mensaje && (
                                <div className={`alert ${mensaje.ok ? 'alert-success' : 'alert-danger'}`}>
                                    {mensaje.ok ? mensaje.message : (mensaje.errors ? mensaje.errors.join(', ') : mensaje.message)}
                                </div>
                            )}
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Iglesia</label>
                                    <input type="text" className="form-control" name="iglesia" value={datos.iglesia} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Lema</label>
                                    <input type="text" className="form-control" name="lema" value={datos.lema} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Logo URL (Google Drive)</label>
                                <input type="text" className="form-control" name="logoUrl" value={datos.logoUrl} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                                <ImagenPreview url={datos.logoUrl} alt="Previsualización logo" />
                            </div>
                            <div className="form-group">
                                <label>Dirección</label>
                                <input type="text" className="form-control" name="direccion" value={datos.direccion} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                            </div>
                            <div className="form-group">
                                <label>Mapa URL (Google Maps embed o link)</label>
                                <input type="text" className="form-control" name="mapaUrl" value={datos.mapaUrl} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Ciudad</label>
                                    <input type="text" className="form-control" name="ciudad" value={datos.ciudad} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>País</label>
                                    <input type="text" className="form-control" name="pais" value={datos.pais} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label>Año Fundación</label>
                                    <input type="number" className="form-control" name="anioFundacion" value={datos.anioFundacion} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Año Actual</label>
                                    <input type="number" className="form-control" name="anioactual" value={datos.anioactual} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Teléfono</label>
                                    <input type="text" className="form-control" name="telefono" value={datos.telefono} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Email</label>
                                    <input type="email" className="form-control" name="email" value={datos.email} onChange={handleChange} style={inputStyle(temaEfectivo)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Redes Sociales</label>
                                {redes.map((r, idx) => (
                                    <div key={r.__id || idx} className="form-row align-items-center mb-2">
                                        <div className="col-4">
                                            <input type="text" className="form-control" placeholder="Nombre" value={r.nombre} onChange={(e) => handleRedChange(idx, 'nombre', e.target.value)} style={inputStyle(temaEfectivo)} />
                                        </div>
                                        <div className="col-5">
                                            <input type="text" className="form-control" placeholder="URL" value={r.url} onChange={(e) => handleRedChange(idx, 'url', e.target.value)} style={inputStyle(temaEfectivo)} />
                                        </div>
                                        <div className="col-2">
                                            <input type="number" className="form-control" placeholder="Orden" value={r.orden} onChange={(e) => handleRedChange(idx, 'orden', e.target.value)} style={inputStyle(temaEfectivo)} />
                                        </div>
                                        <div className="col-1">
                                            <button type="button" className="btn btn-sm btn-danger" onClick={() => removeRed(idx)}>-</button>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-sm btn-secondary" onClick={addRed}>Agregar red</button>
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

export default ModalEditarSite

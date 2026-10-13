import React, { useContext } from 'react'
import TemaContext from '../context/tema'

const modalContentStyle = (temaEfectivo) => ({
    backgroundColor: temaEfectivo === 'dark' ? 'var(--card-bg)' : '#FFFFFF',
    color: temaEfectivo === 'dark' ? 'var(--text-color)' : '#000000',
    border: temaEfectivo === 'dark' ? '1px solid var(--border-color)' : '1px solid rgba(0,0,0,0.2)'
})

function ModalEliminarItem({ show, onClose, onConfirm, item, tipo = 'elemento', procesando = false }) {
    const { temaEfectivo } = useContext(TemaContext)
    if (!show) return null

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content" style={modalContentStyle(temaEfectivo)}>
                    <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <h5 className="modal-title">Confirmar eliminación</h5>
                        <button type="button" className="close" onClick={onClose} style={{ color: 'var(--text-color)' }}><span>&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <p>¿Estás seguro de que deseas eliminar este {tipo}? Se marcará como inactivo.</p>
                        {item && item.nombre && <p><strong>{item.nombre}</strong></p>}
                    </div>
                    <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)' }}>
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={procesando}>Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={procesando}>{procesando ? 'Eliminando...' : 'Eliminar'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalEliminarItem

import React, { useContext } from 'react'
import TemaContext from '../context/tema'

const modalContentStyle = (temaEfectivo) => ({
    backgroundColor: temaEfectivo === 'dark' ? 'var(--card-bg)' : '#FFFFFF',
    color: temaEfectivo === 'dark' ? 'var(--text-color)' : '#000000',
    border: temaEfectivo === 'dark' ? '1px solid var(--border-color)' : '1px solid rgba(0,0,0,0.2)'
})

function ModalEliminarUsuario({ show, onClose, onConfirm, usuario, procesando }) {
    const { temaEfectivo } = useContext(TemaContext)

    if (!show) return null

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div 
                    className="modal-content"
                    style={modalContentStyle(temaEfectivo)}
                >
                    <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <h5 className="modal-title">Eliminar Usuario</h5>
                        <button 
                            type="button" 
                            className="close" 
                            onClick={onClose}
                            style={{ color: 'var(--text-color)' }}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>¿Estás seguro de eliminar al usuario <strong>{usuario?.nombre}</strong>?</p>
                        <p className="text-muted">Esta acción no se puede deshacer.</p>
                    </div>
                    <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)' }}>
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={procesando}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={procesando}>
                            {procesando ? 'Eliminando...' : 'Eliminar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEliminarUsuario

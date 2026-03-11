import React from 'react'
import './styles/btntoggle.css'

function BtnToggleInactivos({ count, onClick, expanded }) {
    return (
        <div className={`box_btntoggle ${expanded ? 'active' : ''}`} onClick={onClick}>
            <button className="d-flex">
                {expanded ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="icono-cerrar">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="icono-restaurar">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                    </svg>
                )}
                <span className="texto-inactivos">{expanded ? 'Ocultar' : `Inactivos (${count})`}</span>
            </button>
            <span className="burbuja-inactivos-mobile">{count}</span>
        </div>
    )
}

export default BtnToggleInactivos

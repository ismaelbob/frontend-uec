import React from 'react'
import './styles/usuarioitem.css'

function UsuarioItemInactivo({ usuario, indice, onRestaurar }) {
    const getNivelTexto = (nivel) => {
        switch(nivel) {
            case 1: return 'Administrador'
            case 2: return 'Estandar'
            case 3: return 'Visor'
            default: return ''
        }
    }

    return (
        <div className="box_usuario">
            <div className="box_usuario-id">
                <h6>{indice}</h6>
            </div>
            <div className="box_usuario-datos">
                <h6>{usuario.nombre} - {usuario.usuario}</h6>
                <p>{getNivelTexto(usuario.nivel)}</p>
            </div>
            <div className="box_usuario-acciones" style={{position: 'relative'}}>
                <button 
                    type="button" 
                    className="text-success" 
                    onClick={() => onRestaurar(usuario._id)}
                    title="Restaurar usuario"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default UsuarioItemInactivo

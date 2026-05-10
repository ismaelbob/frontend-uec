import React from 'react'
import './styles/btnfavoritetoggle.css'
import MarkOutline from '../img/mark-outline.svg'
import MarkFilled from '../img/mark-filled.svg'

function BtnfavoriteToggle ({ isFavorite, isLoggedIn, onToggle }) {
    if (!isLoggedIn) {
        return null
    }

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
    }

    const favoritoActivo = isFavorite === true

    return (
        <div className={`box_btnfavorite_toggle ${favoritoActivo ? 'active' : ''}`}>
            <button
                type="button"
                className="btnfavorite_toggle-inner d-flex align-items-center justify-content-center"
                onClick={handleClick}
                aria-label={favoritoActivo ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                aria-pressed={favoritoActivo}
            >
                <img
                    src={favoritoActivo ? MarkFilled : MarkOutline}
                    alt=""
                    className="btnfavorite_toggle-icon"
                />
                <span className="btnfavorite_toggle-label">Favorito</span>
            </button>
        </div>
    )
}

export default BtnfavoriteToggle

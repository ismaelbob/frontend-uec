import React from 'react'
import {Link} from 'react-router-dom'
import './styles/cancion.css'

class Cancion extends React.Component {
    handleFavoriteClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        const { cancion, himnario, onToggleFavorite, isLoggedIn } = this.props
        
        if (!isLoggedIn) {
            alert('Debes iniciar sesión para marcar favoritos')
            return
        }
        
        if (onToggleFavorite) {
            onToggleFavorite(himnario, cancion._id, cancion.isFavorite)
        }
    }

    render () {
        const { cancion, himnario, isLoggedIn } = this.props
        const isFavorite = cancion.isFavorite === true
        
        return (
            <div className="box_cancion">
                <div className="box_cancion-id">
                    <h6>{cancion.idcancion}</h6>
                </div>
                <Link to={`/cancionero/${himnario}/${cancion.idcancion}`}>
                    <div className="box_cancion-datos">
                        <h6>{cancion.titulo}</h6>
                        <p>{cancion.autor}</p>
                    </div>
                </Link>
                {isLoggedIn && (
                    <button 
                        className={`box_cancion-favorite ${isFavorite ? 'active' : ''}`}
                        onClick={this.handleFavoriteClick}
                        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                        {isFavorite ? '❤️' : '🤍'}
                    </button>
                )}
            </div>
        )
    }
}
export default Cancion
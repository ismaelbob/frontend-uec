import React from 'react'
import './styles/searchbox.css'
import backicon from '../img/search.svg'
import markFilled from '../img/mark-filled.svg'

class Searchbox extends React.Component {
    render () {
        const { soloFavoritos, onToggleFavoritos, favoritosCount, buscar, val, onClick } = this.props
        return (
            <div className="box_searchbox">
                <img src={backicon} alt=""/>
                <input type="text" placeholder="Buscar" onChange={buscar} value={val}/>
                <div>
                    {val !== '' && <button onClick={onClick}>&times;</button>}
                </div>
                {favoritosCount > 0 && (
                    <button 
                        className={`btn_favoritos ${soloFavoritos ? 'active' : ''}`}
                        onClick={onToggleFavoritos}
                        title={soloFavoritos ? 'Mostrar todas' : 'Solo favoritos'}
                    >
                        <img src={markFilled} alt="Favoritos"/>
                        <span className="favoritos_count">{favoritosCount}</span>
                    </button>
                )}
            </div>
        )
    }
}
export default Searchbox
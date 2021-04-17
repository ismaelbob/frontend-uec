import React from 'react'
import './styles/cancion.css'

class Cancion extends React.Component {
    render () {
        return (
            <div className="box_cancion">
                <h4>{`${this.props.cancion.idcancion}. ${this.props.cancion.titulo}`}</h4>
                <p>{this.props.cancion.nota}</p>
            </div>
        )
    }
}
export default Cancion
import React from 'react'
import {Link} from 'react-router-dom'
import './styles/cancion.css'

class Cancion extends React.Component {
    render () {
        return (
            <div className="box_cancion">
                <div className="box_cancion-id">
                    <h6>{this.props.cancion.idcancion}</h6>
                </div>
                <Link to={`/cancionero/${this.props.himnario}/${this.props.cancion.idcancion}`}>
                    <div className="box_cancion-datos">
                        <h6>{this.props.cancion.titulo}</h6>
                        <p>{this.props.cancion.autor}</p>
                    </div>
                </Link>
            </div>
        )
    }
}
export default Cancion
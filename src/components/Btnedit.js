import React from 'react'
import './styles/btnedit.css'
import {Link} from 'react-router-dom'
import icon from '../img/edit.svg'

class Btnedit extends React.Component {
    render () {
        return (
            <div className="box_btnedit">
                <Link to={this.props.url} className="d-flex">
                    <img src={icon} alt="<"/>
                    <div>Editar</div>
                </Link>
            </div>
        )
    }
}
export default Btnedit
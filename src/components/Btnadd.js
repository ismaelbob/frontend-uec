import React from 'react'
import './styles/btnadd.css'
import {Link} from 'react-router-dom'
import addicon from '../img/add.svg'

class Btnadd extends React.Component {
    render () {
        return (
            <div className="box_btnadd">
                <Link to={this.props.url} className="d-flex">
                    <img src={addicon} alt="<"/>
                    <div>Nuevo</div>
                </Link>
            </div>
        )
    }
}
export default Btnadd
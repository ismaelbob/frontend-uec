import React from 'react'
import './styles/btnadd.css'
import {Link} from 'react-router-dom'
import backicon from '../img/add.svg'

class Btnadd extends React.Component {
    render () {
        return (
            <div className="box_btnadd">
                <Link to={this.props.url} className="d-flex">
                    <img src={backicon} alt="<"/>
                    <div>Nuevo</div>
                </Link>
            </div>
        )
    }
}
export default Btnadd
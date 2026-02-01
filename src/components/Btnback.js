import React from 'react'
import './styles/btnback.css'
import {Link} from 'react-router-dom'
import backicon from '../img/back.svg'

class Btnback extends React.Component {
    render () {
        return (
            <div className="box_btnback">
                <Link to={this.props.url} replace className="d-flex">
                    <img src={backicon} alt="<"/>
                    <div>Atras</div>
                </Link>
            </div>
        )
    }
}
export default Btnback
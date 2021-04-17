import React from 'react'
import './styles/btnback.css'
import backicon from '../img/arrow.svg'

class Btnback extends React.Component {
    render () {
        return (
            <div className="box_button">
                <img src={backicon} alt="<"/>
                <div>Atras</div>
            </div>
        )
    }
}
export default Btnback
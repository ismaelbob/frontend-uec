import React from 'react'
import './styles/btnplay.css'
import icon from '../img/play.svg'

class Btnplay extends React.Component {
    render () {
        return (
            <div className="box_btnplay">
                <a href={this.props.url} target="_blanck" className="d-flex">
                    <img src={icon} alt="<"/>
                    <div>Play</div>
                </a>
            </div>
        )
    }
}
export default Btnplay
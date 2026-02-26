import React from 'react'
import './styles/btnadd.css'
import addicon from '../img/add.svg'

class BtnaddModal extends React.Component {
    render () {
        return (
            <div className="box_btnadd">
                <button onClick={this.props.onClick} className="d-flex" style={{background: 'none', border: 'none', padding: 0}}>
                    <img src={addicon} alt="<"/>
                    <div>Nuevo</div>
                </button>
            </div>
        )
    }
}
export default BtnaddModal

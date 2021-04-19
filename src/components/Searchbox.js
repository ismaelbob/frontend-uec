import React from 'react'
import './styles/searchbox.css'
import backicon from '../img/search.svg'

class Searchbox extends React.Component {
    render () {
        return (
            <div className="box_searchbox">
                <img src={backicon} alt=""/>
                <input type="text" placeholder="Buscar" onChange={this.props.buscar} value={this.props.val}/>
                <div>{this.props.val !== '' && <button onClick={this.props.onClick}>&times;</button>}</div>
            </div>
        )
    }
}
export default Searchbox
import React from 'react'
import './styles/loader.css'

class Loader extends React.Component {
    render () {
        return (
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}
export default Loader
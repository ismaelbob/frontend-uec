import React from 'react'
import {Link} from 'react-router-dom'

class Navbar extends React.Component {
    state = {
        menuActivo: 0
    }


    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primario">
                <div className="navbar-brand">Unidos en Cristo</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${this.props.activo === 'Inicio' ? 'active' : ''}`} onClick={this.props.onChangeMenu}>
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className={`nav-item ${this.props.activo === 'Cancionero' ? 'active' : ''}`}>
                            <Link className="nav-link" onClick={this.props.onChangeMenu} to="/cancionero">Cancionero</Link>
                        </li>
                        <li className={`nav-item ${this.props.activo === 'Noticias' ? 'active' : ''}`}>
                            <Link className="nav-link" onClick={this.props.onChangeMenu} to="/noticias">Noticias</Link>
                        </li>
                        <li className={`nav-item ${this.props.activo === 'Ofrendas' ? 'active' : ''}`}>
                            <Link className="nav-link" onClick={this.props.onChangeMenu} to="/ofrendas">Ofrendas</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar
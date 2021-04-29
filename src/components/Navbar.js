import React from 'react'
import './styles/navbar.css'
import {Link} from 'react-router-dom'
import logo from '../img/UEC.png'

class Navbar extends React.Component {
    state = {
        menuActivo: '0',
        toggle: false,
    }

    handleClickToggle = (event) => {
        const menuSandwich = document.querySelector('#links')
        if(event.target.tagName === 'A') {
            this.setState({menuActivo: event.target.name, toggle: false})
            menuSandwich.classList.remove('active')
        } else {
            if (this.state.toggle) {
                menuSandwich.classList.remove('active')
                this.setState({toggle: false})
            } else {
                menuSandwich.classList.add('active')
                this.setState({toggle: true})
            }
        }
    }

    render () {
        return (
            <div className="box_navbar">
                <div className="box_navbar-logo"><img src={logo} alt="Logo"/></div>
                <div className="box_navbar-link" id="links">
                    <div className="box_navbar-link-left">
                        <h4>Unidos en Cristo</h4>
                        <Link name="0" to="/" onClick={this.handleClickToggle} className={this.state.menuActivo === '0' ? 'activo' : ''}>Inicio</Link>
                        <Link name="1" to="/cancionero" onClick={this.handleClickToggle} className={this.state.menuActivo === '1' ? 'activo' : ''}>Cancionero</Link>
                        <Link name="2" to="/noticias" onClick={this.handleClickToggle} className={this.state.menuActivo === '2' ? 'activo' : ''}>Noticias</Link>
                        <Link name="3" to="/cronograma" onClick={this.handleClickToggle} className={this.state.menuActivo === '3' ? 'activo' : ''}>Cronograma</Link>
                    </div>
                    <div className="box_navbar-link-right">
                        <Link name="4" to="/login" onClick={this.handleClickToggle} className={this.state.menuActivo === '4' ? 'activo' : ''}>Iniciar sesion</Link>
                        <button onClick={this.handleClickToggle}>&times;</button>
                    </div>
                </div>
                <div className="box_navbar-toggle"><button onClick={this.handleClickToggle}>&#9776;</button></div>
            </div>
        )
    }
}

export default Navbar
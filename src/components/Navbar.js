import React, { useContext, useState } from 'react'
import './styles/navbar.css'
import {Link} from 'react-router-dom'
import logo from '../img/UEC.png'

import SesionContext from '../context/sesion'

function Navbar (props) {
    const [menuActivo, setMenuActivo] = useState('0')
    const [toggle, setToggle] = useState(false)

    const {nombre} = useContext(SesionContext)

    const handleClickToggle = (event) => {
        const menuSandwich = document.querySelector('#links')
        if(event.target.tagName === 'A') {
            setToggle(false)
            setMenuActivo(event.target.name)
            menuSandwich.classList.remove('active')
        } else {
            if (toggle) {
                menuSandwich.classList.remove('active')
                setToggle(false)
            } else {
                menuSandwich.classList.add('active')
                setToggle(true)
            }
        }
    }


    return (
        <div className="box_navbar">
            <div className="box_navbar-logo"><img src={logo} alt="Logo"/></div>
            <div className="box_navbar-link" id="links">
                <div className="box_navbar-link-left">
                    <h4>Unidos en Cristo</h4>
                    <Link name="0" to="/" onClick={handleClickToggle} className={menuActivo === '0' ? 'activo' : ''}>Inicio</Link>
                    <Link name="1" to="/cancionero" onClick={handleClickToggle} className={menuActivo === '1' ? 'activo' : ''}>Cancionero</Link>
                    <Link name="2" to="/noticias" onClick={handleClickToggle} className={menuActivo === '2' ? 'activo' : ''}>Noticias</Link>
                    <Link name="3" to="/cronograma" onClick={handleClickToggle} className={menuActivo === '3' ? 'activo' : ''}>Cronograma</Link>
                </div>
                <div className="box_navbar-link-right">
                    {
                        nombre !== null ?
                            <Link name="4" to="/login" onClick={handleClickToggle} className={menuActivo === '4' ? 'activo' : ''}>{nombre}</Link>
                            :
                            <Link name="4" to="/login" onClick={handleClickToggle} className={menuActivo === '4' ? 'activo' : ''}>Iniciar sesion</Link>
                    }
                    <button onClick={handleClickToggle}>&times;</button>
                </div>
            </div>
            <div className="box_navbar-toggle"><button onClick={handleClickToggle}>&#9776;</button></div>
        </div>
    )

}

export default Navbar
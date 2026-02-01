import React, { useContext } from 'react'
import './styles/navbar.css'
import {Link} from 'react-router-dom'
import logo from '../img/UEC.png'
import IconUser from '../img/user.svg'

import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'

function Navbar (props) {

    const {nombre} = useContext(SesionContext)
    const {page, handleClick} = useContext(MenuActivoContext)

    return (
        <div className="box_navbar container-fluid">
            <div className="box_navbar-logo"><img src={logo} alt="Logo"/></div>
            <div className="box_navbar-link" id="links">
                <div className="box_navbar-link-left">
                    <Link id='1' onClick={handleClick} className={page === '1' ? 'activo' : ''} to="/">Inicio</Link>
                    <Link id='2' onClick={handleClick} className={page === '2' ? 'activo' : ''} to="/cancionero">Cancionero</Link>
                    <Link id='3' onClick={handleClick} className={page === '3' ? 'activo' : ''} to="/actividades">Actividades</Link>
                </div>
                <div className="box_navbar-link-right">
                    {
                        nombre !== null ?
                            <Link id='4' onClick={handleClick} className={page === '4' ? 'activo' : ''} to="/login">{nombre}</Link>
                            :
                            <Link id='4' onClick={handleClick} className={page === '4' ? 'activo' : ''} to="/login"><img src={IconUser} alt="user"/>Usuario</Link>
                    }
                </div>
            </div>
        </div>
    )

}

export default Navbar
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './styles/NavBarDown.css'
import IconHome from '../img/home.svg'
import IconHim from '../img/himnario.svg'
import IconCron from '../img/cronograma.svg'

import MenuActivoContext from '../context/menuactivo'

function NavBarDown () {

    const {page, handleClick} = useContext(MenuActivoContext)
    return (
        <div className="contenedor">
            <Link id='2' onClick={handleClick} className={page === '2' ? 'btn-activo' : ''} to="/cancionero"><img src={IconHim} alt="himnario"/></Link>
            <Link id='1' onClick={handleClick} className={page === '1' ? 'btn-activo' : ''} to="/"><img src={IconHome} alt="home"/></Link>
            <Link id='3' onClick={handleClick} className={page === '3' ? 'btn-activo' : ''} to="/actividades"><img src={IconCron} alt="cronograma"/></Link>
        </div>
    )
}

export default NavBarDown
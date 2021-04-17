import React, { useState } from 'react'
import Navbar from './components/Navbar'

function Layout (props) {
    const [menuActivo, setMenuActivo] = useState('Inicio')

    const handleMenuActivo = (event) => {
        setMenuActivo(event.target.text)
    }

    return (
        <React.Fragment>
            <Navbar activo={menuActivo} onChangeMenu={handleMenuActivo}/>
            {props.children}
        </React.Fragment>
    )
}

export default Layout
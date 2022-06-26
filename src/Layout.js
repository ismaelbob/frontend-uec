import React from 'react'
import Navbar from './components/Navbar'
import NavBarDown from './components/NavBarDown'

function Layout (props) {
    return (
        <React.Fragment>
            <Navbar/>
            {props.children}
            <NavBarDown/>
        </React.Fragment>
    )
}

export default Layout
import React, { useContext, useState } from 'react'
import './styles/login.css'
import Loader from '../components/Loader'
import Formlogin from '../components/Formlogin'

import SesionContext from '../context/sesion'

function Usuario (props) {
    const [datos, setDatos] = useState({usuario: '', pass: ''})
    const [cargando, setCargando] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const {iniciarSesion, nombre, cerrarSesion} = useContext(SesionContext)


    const handleChange = (event) => {
        setDatos({
                ...datos,
                [event.target.name] : event.target.value,
            }
        )
    }
    const handleSubmitSesion = async (event) => {
        event.preventDefault()
        const form = event.target
        if (datos.usuario === '' || datos.pass === '') {
            form.classList.add('was-validated')
        } else {
            setCargando(true)
            const respuesta = await iniciarSesion(datos)
            if (respuesta === 'correcto') {
                setMensaje('Bienvenido!')
            } else {
                setMensaje(respuesta)
            }
            setCargando(false)
            form.classList.remove('was-validated')
        }
    }

    const salirDeSesion = () => {
        cerrarSesion()
    }

    if (cargando === true) {
        return (
            <div className="container d-flex justify-content-center mt-2">
                <Loader/>
            </div>
        )
    }

    if (nombre) {
        return (
            <div className="container mt-2 d-flex justify-content-between">
                <div>
                    Bienvenido {nombre}!
                </div>
                <div>
                    <button className="btn btn-danger btn-sm" onClick={salirDeSesion}>Cerrar sesion</button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-2 d-flex justify-content-center">
            <Formlogin 
                onChange={handleChange}
                onSubmit={handleSubmitSesion}
                datos={datos} 
                mensaje={mensaje}
            />
        </div>
    )
}
export default Usuario
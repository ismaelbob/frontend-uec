import SesionContext from './index'
import { useState } from 'react'
import Config from '../../config'

function SesionProvider ({children}) {
    const [usuario, setUsuario] = useState(null)
    const [pass, setPass] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [nivel, setNivel] = useState(null)

    const iniciarSesion = async (datos) => {
        try {
            const acceder = await fetch(`${Config.urlapi}api/auth/login`, {method: 'POST', body: JSON.stringify(datos)})
                .then(response => response.json())

            if (acceder.estado === 'correcto') {
                setUsuario(acceder.usuario)
                setPass(acceder.pass)
                setNombre(acceder.nombre)
                setNivel(acceder.nivel)

                localStorage.setItem('user', datos.usuario)
                localStorage.setItem('pass', datos.pass)
                return 'Bienvenido!'
            } else {
                setUsuario(null)
                setPass(null)
                setNombre(null)
                setNivel(null)
                return 'Datos incorrectos'
            }
        } catch (error) {
            console.log('Ocurrio un error: ', error)
            return 'No se pudo conectar'
        }
    }

    const cerrarSesion = () => {
        setUsuario(null)
        setPass(null)
        setNombre(null)
        setNivel(null)

        localStorage.removeItem('user')
        localStorage.removeItem('pass')
    }

    const existeSesion = async () => {
        try {
            const datoStorage = { usuario: localStorage.getItem('user'), pass: localStorage.getItem('pass')}
            const resultado = await fetch(`${Config.urlapi}api/auth/login`, {method: 'POST', body: JSON.stringify(datoStorage)})
                .then(response => response.json())
            if (resultado.estado === 'correcto') {
                setUsuario(resultado.usuario)
                setPass(resultado.pass)
                setNombre(resultado.nombre)
                setNivel(resultado.nivel)

                return 'Bienvenido!'
            } else {
                setUsuario(null)
                setPass(null)
                setNombre(null)
                setNivel(null)
                return 'Datos incorrectos'
            }
        } catch (error) {
            return 'No se pudo conectar'
        }
    }
    

    return (
        <SesionContext.Provider value={{usuario, iniciarSesion, cerrarSesion,pass, existeSesion, nombre, nivel}}>
            {children}
        </SesionContext.Provider>
    )
}

export default SesionProvider
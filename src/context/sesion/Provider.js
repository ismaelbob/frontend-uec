import SesionContext from './index'
import { useState } from 'react'

function SesionProvider ({children}) {
    const [usuario, setUsuario] = useState(null)
    const [pass, setPass] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [nivel, setNivel] = useState(null)

    const iniciarSesion = async (datos) => {
        try {
            const acceder = await fetch('https://uecapi.herokuapp.com/usuarios/iniciarsesion.php', {method: 'POST', body: JSON.stringify(datos)})
                .then(response => response.json())

            if (acceder.estado === 'correcto') {
                setUsuario(acceder.usuario)
                setPass(acceder.pass)
                setNombre(acceder.nombre)
                setNivel(acceder.nivel)
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
    }

    const existeSesion = async () => {
        try {
            const resultado = await fetch('https://uecapi.herokuapp.com/usuarios/existesesion.php', {method: 'POST'})
                .then(response => response.json())
            return resultado
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
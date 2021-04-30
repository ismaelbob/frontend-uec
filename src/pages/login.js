import React from 'react'
import './styles/login.css'

class Login extends React.Component {
    render () {
        return (
            <div className="container mt-2 d-flex justify-content-center">
                <div className="box_login">
                    <form>
                        <h5>INICIAR SESION</h5>
                        <label htmlFor="usuario">Usuario:</label>
                        <input className="form-control" type="text" name="usuario" id="usuario"/>
                        <label htmlFor="pass">Contraseña:</label>
                        <input className="form-control" type="password" name="pass" id="pass"/>
                        <input className="btn btn-primary mt-5 w-100" type="submit" value="Acceder"/>               
                    </form>
                </div>
            </div>
        )
    }
}
export default Login
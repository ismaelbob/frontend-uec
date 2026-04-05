import React from 'react'
import TemaContext from '../context/tema'

class Formlogin extends React.Component {
    render () {
        const { temaEfectivo } = this.context || {}
        const btnStyle = temaEfectivo === 'dark' 
            ? { backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', borderColor: 'var(--border-color)' }
            : {}

        return (
            <div className="box_login">
                <form className="needs-validation" noValidate name="form-login" onSubmit={this.props.onSubmit}>
                    <h5 className="text-primary">INICIAR SESION</h5>
                    <label htmlFor="usuario">Usuario:</label>
                    <input className="form-control" type="text" name="usuario" id="usuario" required autoComplete='off' value={this.props.datos.usuario} onChange={this.props.onChange}/>
                    <label htmlFor="pass">Contraseña:</label>
                    <input className="form-control" type="password" name="password" id="password" required value={this.props.datos.password} onChange={this.props.onChange}/>
                    <input className="btn btn-primary mt-5 w-100" type="submit" value="Acceder"/>               
                </form>
                {
                    this.props.mensaje !== '' && <div className="alert alert-danger text-center mt-4" role="alert">{this.props.mensaje}</div>
                }
                {this.props.onRegister && (
                    <div className="text-center mt-3">
                        <span style={{color: temaEfectivo === 'dark' ? 'var(--text-color)' : '#666'}}>¿No tienes cuenta?</span>
                        <button 
                            type="button" 
                            className="btn btn-link p-0 ml-1" 
                            onClick={this.props.onRegister}
                            style={btnStyle}
                        >
                            Registrarse
                        </button>
                    </div>
                )}
            </div>
        )
    }
}
Formlogin.contextType = TemaContext
export default Formlogin
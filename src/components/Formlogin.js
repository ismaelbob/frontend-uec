import React from 'react'

class Formlogin extends React.Component {
    render () {
        return (
            <div className="box_login">
                <form className="needs-validation" noValidate name="form-login" onSubmit={this.props.onSubmit}>
                    <h5>INICIAR SESION</h5>
                    <label htmlFor="usuario">Usuario:</label>
                    <input className="form-control" type="text" name="usuario" id="usuario" required autoComplete='off' value={this.props.datos.usuario} onChange={this.props.onChange}/>
                    <label htmlFor="pass">Contraseña:</label>
                    <input className="form-control" type="password" name="password" id="password" required value={this.props.datos.password} onChange={this.props.onChange}/>
                    <input className="btn btn-primary mt-5 w-100" type="submit" value="Acceder"/>               
                </form>
                {
                    this.props.mensaje !== '' && <div className="alert alert-danger text-center mt-4" role="alert">{this.props.mensaje}</div>
                }
            </div>
        )
    }
}
export default Formlogin
import React, { useState, useContext } from 'react'
import TemaContext from '../context/tema'

function FormRegistro({ onSubmit, onCancel, mensaje, cargando }) {
    const { temaEfectivo } = useContext(TemaContext)
    const [datos, setDatos] = useState({
        nombre: '',
        usuario: '',
        email: '',
        password: '',
        passwordRepetir: ''
    })
    const [error, setError] = useState('')

    const inputStyle = {
        backgroundColor: temaEfectivo === 'dark' ? 'var(--input-bg)' : '#FFFFFF',
        color: temaEfectivo === 'dark' ? 'var(--text-color)' : '#000000',
        borderColor: temaEfectivo === 'dark' ? 'var(--input-border)' : '#CED4DA'
    }

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!datos.nombre || !datos.usuario || !datos.email || !datos.password || !datos.passwordRepetir) {
            setError('Todos los campos son requeridos')
            return
        }

        if (datos.password !== datos.passwordRepetir) {
            setError('Las contraseñas no coinciden')
            return
        }

        if (datos.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(datos.email)) {
            setError('Ingresa un email válido')
            return
        }

        await onSubmit({
            nombre: datos.nombre,
            usuario: datos.usuario,
            email: datos.email,
            password: datos.password,
            nivel: 3
        })
    }

    const handleInputFocus = (e) => {
        e.target.style.borderColor = temaEfectivo === 'dark' ? 'var(--primary-text)' : '#007bff'
        e.target.style.boxShadow = '0 0 0 0.2rem rgba(51, 102, 153, 0.25)'
    }

    const handleInputBlur = (e) => {
        e.target.style.borderColor = ''
        e.target.style.boxShadow = 'none'
    }

    return (
        <div className="box_login">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <h5 className="text-primary">REGISTRARSE</h5>
                
                {mensaje && (
                    <div className={`alert ${mensaje.ok ? 'alert-success' : 'alert-danger'} text-center`} role="alert">
                        {mensaje.ok ? mensaje.message : mensaje.message}
                    </div>
                )}
                
                {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}

                <label htmlFor="nombre">Nombre:</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="nombre" 
                    id="nombre" 
                    required 
                    autoComplete='off' 
                    value={datos.nombre} 
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={inputStyle}
                />

                <label htmlFor="usuario">Usuario:</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="usuario" 
                    id="usuario" 
                    required 
                    autoComplete='off' 
                    value={datos.usuario} 
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={inputStyle}
                />

                <label htmlFor="email">Email:</label>
                <input 
                    className="form-control" 
                    type="email" 
                    name="email" 
                    id="email" 
                    required 
                    autoComplete='off' 
                    value={datos.email} 
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={inputStyle}
                />

                <label htmlFor="password">Contraseña:</label>
                <input 
                    className="form-control" 
                    type="password" 
                    name="password" 
                    id="password" 
                    required 
                    value={datos.password} 
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={inputStyle}
                />

                <label htmlFor="passwordRepetir">Confirmar Contraseña:</label>
                <input 
                    className="form-control" 
                    type="password" 
                    name="passwordRepetir" 
                    id="passwordRepetir" 
                    required 
                    value={datos.passwordRepetir} 
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={inputStyle}
                />

                <div className="d-flex mt-4">
                    <button 
                        type="button" 
                        className="btn btn-secondary flex-grow-1 mr-2" 
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                    <input 
                        className="btn btn-primary flex-grow-1" 
                        type="submit" 
                        value={cargando ? 'Registrando...' : 'Registrarse'}
                        disabled={cargando}
                    />
                </div>
            </form>
        </div>
    )
}

export default FormRegistro
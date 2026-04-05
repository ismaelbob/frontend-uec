import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import TemaContext from '../context/tema'
import Config from '../config'

function VerificarEmail() {
    const [estado, setEstado] = useState('cargando')
    const [mensaje, setMensaje] = useState('')
    const [email, setEmail] = useState('')
    const [reenviando, setReenviando] = useState(false)
    const { temaEfectivo } = useContext(TemaContext)
    const location = useLocation()
    const history = useHistory()

    const containerStyle = {
        backgroundColor: temaEfectivo === 'dark' ? '#2d2d2d' : '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    }

    const cardStyle = {
        backgroundColor: temaEfectivo === 'dark' ? 'var(--card-bg)' : '#fff',
        color: temaEfectivo === 'dark' ? 'var(--text-color)' : '#000',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const token = params.get('token')

        if (token) {
            verificarToken(token)
        } else {
            setEstado('error')
            setMensaje('Token de verificación no encontrado')
        }
    }, [location])

    const verificarToken = async (token) => {
        try {
            const response = await fetch(`${Config.urlapi}api/auth/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            })
            const data = await response.json()
            
            if (data.ok) {
                setEstado('exito')
                setMensaje(data.message || 'Tu email ha sido verificado correctamente')
            } else {
                setEstado('error')
                setMensaje(data.message || 'El enlace de verificación es inválido o ha expirado')
            }
        } catch (error) {
            console.error('Error al verificar email:', error)
            setEstado('error')
            setMensaje('Error de conexión. Intenta de nuevo más tarde.')
        }
    }

    const handleReenviar = async () => {
        if (!email) {
            alert('Por favor ingresa tu email')
            return
        }

        setReenviando(true)
        try {
            const response = await fetch(`${Config.urlapi}api/auth/resend-verification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            const data = await response.json()
            
            if (data.ok) {
                alert('Email de verificación reenviado correctamente')
            } else {
                alert(data.message || 'Error al reenviar el email')
            }
        } catch (error) {
            console.error('Error al reenviar verificación:', error)
            alert('Error de conexión')
        }
        setReenviando(false)
    }

    const irALogin = () => {
        history.push('/login')
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                {estado === 'cargando' && (
                    <>
                        <div className="spinner-border text-primary mb-3" role="status"></div>
                        <h5>Verificando tu email...</h5>
                    </>
                )}

                {estado === 'exito' && (
                    <>
                        <div className="text-success mb-3">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h5 className="text-success">¡Verificación exitosa!</h5>
                        <p>{mensaje}</p>
                        <button className="btn btn-primary" onClick={irALogin}>
                            Ir al Login
                        </button>
                    </>
                )}

                {estado === 'error' && (
                    <>
                        <div className="text-danger mb-3">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        </div>
                        <h5 className="text-danger">Error de verificación</h5>
                        <p>{mensaje}</p>
                        
                        <div className="mt-4">
                            <label htmlFor="email">¿No recibiste el email?</label>
                            <input
                                type="email"
                                className="form-control mt-2"
                                id="email"
                                placeholder="Ingresa tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button 
                                className="btn btn-secondary mt-2" 
                                onClick={handleReenviar}
                                disabled={reenviando}
                            >
                                {reenviando ? 'Enviando...' : 'Reenviar email de verificación'}
                            </button>
                        </div>
                        
                        <div className="mt-3">
                            <button className="btn btn-link" onClick={irALogin}>
                                Volver al Login
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default VerificarEmail
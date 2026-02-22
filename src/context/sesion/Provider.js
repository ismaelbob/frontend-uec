import SesionContext from './index'
import { useState } from 'react'
import Config from '../../config'

function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [nombre, setNombre] = useState(null)
  const [nivel, setNivel] = useState(null)

  const iniciarSesion = async (datos) => {
    try {
      const response = await fetch(`${Config.urlapi}api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      })

      const data = await response.json().catch(() => null)

      // Si tu backend responde 500 o cualquier error, esto te ayuda a no "romper" el flujo
      if (!response.ok || !data) {
        setUsuario(null)
        setNombre(null)
        setNivel(null)
        return 'No se pudo conectar'
      }

      if (data.ok === true) {
        setUsuario(data.usuario)
        setNombre(data.nombre)
        setNivel(data.nivel)

        // Guardar sesión basada en tokens (y algunos datos de UI)
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('user', data.usuario)
        localStorage.setItem('nombre', data.nombre)
        localStorage.setItem('nivel', String(data.nivel))
        localStorage.setItem('_id', data._id)

        // Para compatibilidad con tu `Usuario.js` actual
        return 'correcto'
      }

      setUsuario(null)
      setNombre(null)
      setNivel(null)
      return 'Datos incorrectos'
    } catch (error) {
      console.log('Ocurrio un error: ', error)
      return 'No se pudo conectar'
    }
  }

  const cerrarSesion = () => {
    setUsuario(null)
    setNombre(null)
    setNivel(null)

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('nombre')
    localStorage.removeItem('nivel')
    localStorage.removeItem('_id')
  }

  const cambiarPassword = async (datos) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const userId = localStorage.getItem('_id')

      if (!accessToken || !userId) {
        return { ok: false, message: 'No hay sesión activa' }
      }

      const response = await fetch(`${Config.urlapi}api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          password: datos.passwordNuevo
        })
      })

      const data = await response.json().catch(() => null)

      if (!response.ok || !data) {
        return { ok: false, message: 'Error de conexión' }
      }

      if (data.ok === true) {
        return { ok: true, message: data.message || 'Contraseña actualizada correctamente' }
      }

      return { ok: false, message: data.message || 'Datos incorrectos' }
    } catch (error) {
      console.error('Error al cambiar contraseña:', error)
      return { ok: false, message: 'No se pudo conectar' }
    }
  }

  // Función auxiliar para refrescar el access token usando el refresh token
  const refrescarToken = async (refreshToken) => {
    try {
      const response = await fetch(`${Config.urlapi}api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      })

      if (!response.ok) {
        return false
      }

      const data = await response.json()

      if (data.ok === true && data.accessToken) {
        // Guardar nuevo access token
        localStorage.setItem('accessToken', data.accessToken)
        
        // Si también devuelve refresh token nuevo, actualizarlo
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken)
        }
        
        // Actualizar datos del usuario si vienen en la respuesta
        if (data.usuario) {
          setUsuario(data.usuario)
          localStorage.setItem('user', data.usuario)
        }
        if (data.nombre) {
          setNombre(data.nombre)
          localStorage.setItem('nombre', data.nombre)
        }
        if (data.nivel !== undefined) {
          setNivel(data.nivel)
          localStorage.setItem('nivel', String(data.nivel))
        }
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error refrescando token:', error)
      return false
    }
  }

  const existeSesion = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')

      // Si no hay tokens, no hay sesión
      if (!accessToken || !refreshToken) {
        cerrarSesion()
        return 'Datos incorrectos'
      }
      
      // Verificar el token con el endpoint de verificación
      try {
        const verifyResponse = await fetch(`${Config.urlapi}api/auth/verify`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })
        
        // Si el token es válido
        if (verifyResponse.ok) {
          const userData = await verifyResponse.json()
          
          // Si tu API devuelve { ok: true, usuario, nombre, nivel }
          if (userData.ok === true) {
            setUsuario(userData.user.usuario)
            setNombre(userData.user.nombre)
            setNivel(userData.user.nivel)
            
            // Actualizar localStorage con datos actualizados del servidor
            localStorage.setItem('user', userData.user.usuario)
            localStorage.setItem('nombre', userData.user.nombre)
            localStorage.setItem('nivel', String(userData.user.nivel))
            localStorage.setItem('_id', userData.user._id)
            return 'correcto'
          }
        }
        
        // Si el token expiró (401 Unauthorized), intentar refrescar
        if (verifyResponse.status === 401) {
          const refreshed = await refrescarToken(refreshToken)
          if (refreshed) {
            // Si se refrescó exitosamente, verificar nuevamente o restaurar desde localStorage
            const user = localStorage.getItem('user')
            const nombreLS = localStorage.getItem('nombre')
            const nivelLS = localStorage.getItem('nivel')
            const idLS = localStorage.getItem('_id')
            if (user && nombreLS && nivelLS) {
              setUsuario(user)
              setNombre(nombreLS)
              setNivel(nivelLS)
              if (idLS) localStorage.setItem('_id', idLS)
              return 'correcto'
            }
          }
        }
        
        // Si no es válido y no se pudo refrescar, limpiar sesión
        cerrarSesion()
        return 'Datos incorrectos'
        
      } catch (error) {
        console.error('Error verificando token:', error)
        
        // Si hay error de red, restaurar desde localStorage como fallback
        const user = localStorage.getItem('user')
        const nombreLS = localStorage.getItem('nombre')
        const nivelLS = localStorage.getItem('nivel')
        const idLS = localStorage.getItem('_id')
        
        if (user && nombreLS && nivelLS) {
          setUsuario(user)
          setNombre(nombreLS)
          setNivel(nivelLS)
          if (idLS) localStorage.setItem('_id', idLS)
          return 'correcto'
        }
        
        cerrarSesion()
        return 'No se pudo conectar'
      }
      
    } catch (error) {
      console.error('Error en existeSesion:', error)
      cerrarSesion()
      return 'No se pudo conectar'
    }
  }

  return (
      <SesionContext.Provider
        value={{ usuario, iniciarSesion, cerrarSesion, existeSesion, nombre, nivel, cambiarPassword }}
      >
      {children}
    </SesionContext.Provider>
  )
}

export default SesionProvider
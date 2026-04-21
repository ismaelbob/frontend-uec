import Config from '../config'

function cerrarSesionApp() {
  // Usar window.cerrarSesionApp definida en el Provider
  if (typeof window.cerrarSesionAppApp === 'function') {
    window.cerrarSesionAppApp()
  } else if (typeof window.cerrarSesionApp === 'function') {
    window.cerrarSesionApp()
  } else {
    // Fallback: limpiar manualmente
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('nombre')
    localStorage.removeItem('nivel')
    localStorage.removeItem('_id')
  }
  window.location.href = '/usuario'
}

export async function fetchConAuth(url, options = {}) {
  const accessToken = localStorage.getItem('accessToken')
  
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`
  }
  
  let response = await fetch(url, { ...options, headers })
  
  if (response.status === 401) {
    const refreshTokenLS = localStorage.getItem('refreshToken')
    if (refreshTokenLS) {
      const refreshResponse = await fetch(`${Config.urlapi}api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshTokenLS })
      })
      
      if (refreshResponse.ok) {
        const data = await refreshResponse.json()
        if (data.ok && data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken)
          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken)
          }
          
          const newAccessToken = localStorage.getItem('accessToken')
          headers['Authorization'] = `Bearer ${newAccessToken}`
          response = await fetch(url, { ...options, headers })
        } else {
          cerrarSesionApp()
        }
      } else {
        cerrarSesionApp()
      }
    } else {
      cerrarSesionApp()
    }
  }
  
  return response
}
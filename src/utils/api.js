import Config from '../config'

// Variables globales para coordinar refresh
let isRefreshing = false
let refreshPromise = null

function cerrarSesionApp(onNavigate) {
  if (typeof window.cerrarSesionAppApp === 'function') {
    window.cerrarSesionAppApp()
  } else if (typeof window.cerrarSesionApp === 'function') {
    window.cerrarSesionApp()
  } else {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('nombre')
    localStorage.removeItem('nivel')
    localStorage.removeItem('_id')
  }
  
  if (onNavigate) {
    onNavigate()
  } else {
    window.location.href = '/login'
  }
}

async function performRefresh(refreshToken) {
  return fetch(`${Config.urlapi}api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  })
}

export async function fetchConAuth(url, options = {}) {
  const { onUnauthorized, ...fetchOptions } = options
  const accessToken = localStorage.getItem('accessToken')
  
  const headers = {
    ...fetchOptions.headers,
    'Authorization': `Bearer ${accessToken}`
  }
  
  let response = await fetch(url, { ...fetchOptions, headers })
  
  if (response.status === 401) {
    const refreshTokenLS = localStorage.getItem('refreshToken')
    
    // CASO 1: Ya hay un refresh en progreso - esperar
    if (isRefreshing && refreshPromise) {
      await refreshPromise
      
      // Delay pequeño para asegurar que el token esté disponible
      await new Promise(resolve => setTimeout(resolve, 50))
      
      // Después de esperar, reintentar con el nuevo token
      const newAccessToken = localStorage.getItem('accessToken')
      
      if (newAccessToken) {
        headers['Authorization'] = `Bearer ${newAccessToken}`
        response = await fetch(url, { ...fetchOptions, headers })
      } else {
        cerrarSesionApp(onUnauthorized)
      }
      return response
    }
    
    // CASO 2: No hay refresh en progreso - iniciar uno nuevo
    if (refreshTokenLS) {
      isRefreshing = true
      refreshPromise = performRefresh(refreshTokenLS)
      
      try {
        const refreshResponse = await refreshPromise
        
        if (refreshResponse.ok) {
          const data = await refreshResponse.json()
          
          if (data.ok && data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken)
            if (data.refreshToken) {
              localStorage.setItem('refreshToken', data.refreshToken)
            }
          } else {
            cerrarSesionApp(onUnauthorized)
            return response
          }
        } else {
          cerrarSesionApp(onUnauthorized)
          return response
        }
      } catch (error) {
        console.error('Error en refresh:', error)
        cerrarSesionApp(onUnauthorized)
        return response
      } finally {
        isRefreshing = false
        refreshPromise = null
      }
    } else {
      cerrarSesionApp(onUnauthorized)
      return response
    }
    
    // Reintentar la petición original DESPUÉS del refresh
    // Delay pequeño para asegurar que el token esté disponible en localStorage
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const newAccessToken = localStorage.getItem('accessToken')
    headers['Authorization'] = `Bearer ${newAccessToken}`
    response = await fetch(url, { ...fetchOptions, headers })
  }
  
  return response
}
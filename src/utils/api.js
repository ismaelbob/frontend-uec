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
    
    // Si ya hay un refresh en progreso, esperar a que termine
    if (isRefreshing && refreshPromise) {
      await refreshPromise
      
      // Verificar si el refresh fue exitoso
      const newAccessToken = localStorage.getItem('accessToken')
      
      if (newAccessToken) {
        // Refresh exitoso, reintentar con el nuevo token
        headers['Authorization'] = `Bearer ${newAccessToken}`
        response = await fetch(url, { ...fetchOptions, headers })
      } else {
        // Refresh falló, cerrar sesión
        cerrarSesionApp(onUnauthorized)
      }
      return response
    }
    
    // Iniciar refresh si no hay uno en progreso
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
            
            // Reintentar con el nuevo token
            const newAccessToken = localStorage.getItem('accessToken')
            headers['Authorization'] = `Bearer ${newAccessToken}`
            response = await fetch(url, { ...fetchOptions, headers })
          } else {
            cerrarSesionApp(onUnauthorized)
          }
        } else {
          cerrarSesionApp(onUnauthorized)
        }
      } finally {
        isRefreshing = false
        refreshPromise = null
      }
    } else {
      cerrarSesionApp(onUnauthorized)
    }
  }
  
  return response
}
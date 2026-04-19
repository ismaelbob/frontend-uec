import Config from '../config'

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
          throw new Error('Token refresh failed')
        }
      } else {
        throw new Error('Token refresh failed')
      }
    } else {
      throw new Error('No refresh token')
    }
  }
  
  return response
}
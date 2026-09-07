import { useState, useEffect } from 'react'
import { aplicarActualizacion } from '../utils/pwaUpdate'
import './styles/pwaupdatebanner.css'

const INTERVALO_CHECK_MIN = 60

function PwaUpdateBanner () {
    const [registration, setRegistration] = useState(null)

    const cerrar = () => setRegistration(null)

    useEffect(() => {
        const onUpdateAvailable = (event) => {
            setRegistration(event.detail)
        }
        window.addEventListener('pwa-update-available', onUpdateAvailable)

        const checkUpdate = async () => {
            try {
                if (!('serviceWorker' in navigator)) return
                const reg = await navigator.serviceWorker.getRegistration()
                if (reg) reg.update()
            } catch (error) {
                console.log('No se pudo buscar actualizacion:', error)
            }
        }

        const intervalo = setInterval(checkUpdate, INTERVALO_CHECK_MIN * 60 * 1000)
        const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') checkUpdate()
        }
        document.addEventListener('visibilitychange', onVisibilityChange)

        return () => {
            window.removeEventListener('pwa-update-available', onUpdateAvailable)
            clearInterval(intervalo)
            document.removeEventListener('visibilitychange', onVisibilityChange)
        }
    }, [])

    if (!registration || !registration.waiting) return null

    return (
        <div className="box_pwaupdate" role="alert">
            <div className="box_pwaupdate-info">
                <div className="box_pwaupdate-title">Nueva versión disponible</div>
                <div className="box_pwaupdate-text">
                    Hay una actualización lista para aplicar.
                </div>
            </div>
            <div className="box_pwaupdate-actions">
                <button
                    type="button"
                    className="pwaupdate-btn"
                    onClick={() => aplicarActualizacion(registration)}
                >
                    Actualizar
                </button>
                <button
                    type="button"
                    className="pwaupdate-close"
                    onClick={cerrar}
                    aria-label="Cerrar"
                >
                    &times;
                </button>
            </div>
        </div>
    )
}

export default PwaUpdateBanner
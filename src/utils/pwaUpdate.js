let registracionPendiente = null

const setRegistracionPendiente = (registration) => {
    registracionPendiente = registration
}

const getRegistracionPendiente = () => registracionPendiente

const aplicarActualizacion = (registration) => {
    if (!registration || !registration.waiting) return

    const recargar = () => window.location.reload()
    let recargado = false
    const manejarControllerChange = () => {
        if (recargado) return
        recargado = true
        window.removeEventListener('controllerchange', manejarControllerChange)
        recargar()
    }

    window.addEventListener('controllerchange', manejarControllerChange)

    registration.waiting.postMessage({ type: 'SKIP_WAITING' })

    setTimeout(() => {
        if (!recargado) {
            recargado = true
            window.removeEventListener('controllerchange', manejarControllerChange)
            recargar()
        }
    }, 8000)
}

const buscarActualizaciones = () => {
    const resolverNada = () => (
        registracionPendiente && registracionPendiente.waiting
            ? registracionPendiente
            : null
    )

    return new Promise((resolve) => {
        if (!('serviceWorker' in navigator)) {
            resolve(null)
            return
        }

        if (registracionPendiente && registracionPendiente.waiting) {
            resolve(registracionPendiente)
            return
        }

        const manejarEvento = (event) => {
            window.removeEventListener('pwa-update-available', manejarEvento)
            resolve(event.detail || null)
        }
        window.addEventListener('pwa-update-available', manejarEvento)

        navigator.serviceWorker.getRegistration()
            .then((reg) => {
                if (!reg) {
                    window.removeEventListener('pwa-update-available', manejarEvento)
                    resolve(null)
                    return
                }
                reg.update()
                    .then(() => {
                        setTimeout(() => {
                            window.removeEventListener('pwa-update-available', manejarEvento)
                            resolve(resolverNada())
                        }, 1500)
                    })
                    .catch(() => {
                        window.removeEventListener('pwa-update-available', manejarEvento)
                        resolve(null)
                    })
            })
            .catch(() => {
                window.removeEventListener('pwa-update-available', manejarEvento)
                resolve(null)
            })
    })
}

export {
    setRegistracionPendiente,
    getRegistracionPendiente,
    aplicarActualizacion,
    buscarActualizaciones
}
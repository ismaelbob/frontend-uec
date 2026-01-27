import {useState, useEffect, useContext, useCallback} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './styles/addcancion.css'
import Btnback from '../components/Btnback'
import Formcancion from '../components/Formcancion'
import Loader from '../components/Loader'
import Config from '../config'

import SesionContext from '../context/sesion'
import HimnarioContext from '../context/himnario'

function Addcancion() {
    const { himnario} = useParams()
    const history = useHistory()
    const { existeSesion } = useContext(SesionContext)
    const {refreshHimnario} = useContext(HimnarioContext)
    const [datosCancion, setDatosCancion] = useState({
        idcancion: '',
        titulo: '',
        autor: '',
        nota: '',
        letra: '',
        enlace: '',
        himnario: himnario,
        activo: true
    })
    const [cargando, setCargando] = useState(true)
    const [respuesta, setRespuesta] = useState('')
    const [respuestaId, setRespuestaId] = useState(null)
    const [idActual, setIdActual] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const getNumHimnario = useCallback(async () => {
        try {
            const response = await fetch(
                `${Config.urlapi}api/songs/next-number/${himnario}`
            )
            const res = await response.json()
            return res.nextId
        } catch (error) {
            console.error('Error al traer numero que corresponde:', error)
        }
    }, [himnario])

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            history.push('/cancionero')
            return
        }
    
        const init = async () => {
            await existeSesion()
    
            const nextId = await getNumHimnario()
            if (nextId) {
                setIdActual(nextId)
                setDatosCancion(prev => ({
                    ...prev,
                    idcancion: nextId
                }))
                setCargando(false)
                setRespuestaId('')
            }
        }
    
        init()
    }, [existeSesion, getNumHimnario, history])

    useEffect(() => {
        if (!datosCancion.idcancion) return

        if (datosCancion.idcancion === idActual) {
            setRespuestaId('')
            return
        }
    
        const timeoutId = setTimeout(async () => {
            try {
                const response = await fetch(
                  `${Config.urlapi}api/songs/${himnario}/${datosCancion.idcancion}/exists`
                )
                const res = await response.json()
    
                res.exists
                    ? setRespuestaId('Este número ya existe, pruebe con otro')
                    : setRespuestaId('Disponible')
            } catch (error) {
                console.error('Error al verificar idcancion:', error)
            }
        }, 500)
    
        // 🔥 cleanup → cancela el timeout anterior
        return () => clearTimeout(timeoutId)
    
    }, [datosCancion.idcancion, himnario, idActual])


    // Handler para cambios en el formulario
    const handleChange = ({ target: { name, value } }) => {
        setDatosCancion(prev => ({
            ...prev,
            [name]: value,
        }))
    
        if (name === 'idcancion' && value === '') {
            setRespuestaId('Es necesario llenar este campo')
        }
    }

    const handleClickReset = () => {
        setDatosCancion(prev => ({
            ...prev,
            idcancion: idActual
        }))
        setRespuestaId('')
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        // Prevenir doble envío
        if (isSubmitting) {
            return
        }


        setIsSubmitting(true)
        setCargando(true)
        setRespuesta('')

        try {
            const response = await fetch(`${Config.urlapi}api/songs/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(datosCancion)
            })

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)   
            }

            const res = await response.json()
            setRespuesta(res.estado || 'correcto')

            // Actualizar caché
            try {
                const cache = await caches.open('memoria-v1')
                const cacheResponse = await cache.delete(`${Config.urlapi}api/songs/${himnario}`)
                if (!cacheResponse) {
                    console.warn('El recurso no estaba en la caché, pero se procederá a agregarlo.')
                }
                await cache.add(`${Config.urlapi}api/songs/${himnario}`)
            } catch (error) {
                console.error('Error al actualizar la caché:', error)
                // No bloquear el flujo si falla la caché
            }

            setCargando(false)
            setIsSubmitting(false)

            refreshHimnario(himnario)
            // Redirigir sin recargar la página
            setTimeout(() => {
                history.push(`/cancionero/${himnario}`)
            }, 1000) // Pequeño delay para mostrar mensaje de éxito

        } catch (error) {
            console.error('Error al crear canción:', error)
            setCargando(false)
            setIsSubmitting(false)
        }
    }

    // Mostrar loader mientras carga
    if (cargando && !isSubmitting) {
        return (
            <div className="container mt-2 d-flex justify-content-center">
                <Loader/>
            </div>
        )
    }

    return (
        <div className="container mt-2 mb-5">
            <div className="box_headernew">
                <div className="box_headernew-back">
                    <Btnback url={`/cancionero/${himnario}`}/>
                </div>
                <div className="box_headernew-title">
                    <h5>NUEVA CANCION</h5>
                </div>
                <div></div>
            </div>
            <Formcancion 
                himnario={himnario} 
                datos={datosCancion} 
                onChange={handleChange}
                onSubmit={handleSubmit}
                respuesta={respuesta}
                respuestaId={respuestaId}
                onClick={handleClickReset}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}
export default Addcancion
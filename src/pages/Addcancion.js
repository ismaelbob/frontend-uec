import {useState, useEffect, useContext, useCallback} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './styles/addcancion.css'
import Btnback from '../components/Btnback'
import Formcancion from '../components/Formcancion'
import Loader from '../components/Loader'
import Config from '../config'
import { fetchConAuth } from '../utils/api'

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
            const response = await fetchConAuth(
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
            history.replace('/cancionero')
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
                const response = await fetchConAuth(
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
            const response = await fetchConAuth(`${Config.urlapi}api/songs/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosCancion)
            })

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)   
            }

            const res = await response.json()
            setRespuesta(res.estado || 'correcto')


            setCargando(false)
            setIsSubmitting(false)

            refreshHimnario(himnario)
            // Redirigir sin recargar la página
            setTimeout(() => {
                history.replace(`/cancionero/${himnario}`)
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
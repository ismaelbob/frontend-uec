import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Btnback from '../components/Btnback'
import Formcancion from '../components/Formcancion'
import Loader from '../components/Loader'
import Config from '../config'

import SesionContext from '../context/sesion'
import HimnarioContext from '../context/himnario'

function Editcancion() {
    const { himnario, id } = useParams()
    const history = useHistory()
    const { existeSesion } = useContext(SesionContext)
    const {datos, refreshHimnario} = useContext(HimnarioContext)

    const [datosCancion, setDatosCancion] = useState({
        _id: '',
        idcancion: '',
        titulo: '',
        autor: '',
        nota: '',
        letra: '',
        enlace: '',
    })
    const [cargando, setCargando] = useState(true)
    const [respuesta, setRespuesta] = useState('')
    const [respuestaId, setRespuestaId] = useState(null)
    const [idActual, setIdActual] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            history.replace('/cancionero')
            return
        }

        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (accessToken && refreshToken) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }
        const cancion = seleccionarCancion(id)
        cancion.length === 1
            ? setDatosCancion(cancion[0])
            : history.replace(`/cancionero/${himnario}/${id}`)
        setCargando(false)
        setRespuestaId('')
        setIdActual(cancion[0].idcancion)
        // eslint-disable-next-line
    }, [])

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


    const seleccionarCancion = (id) => {
        const canciones = datos?.songs || (Array.isArray(datos) ? datos : [])
        if (!canciones.length) return []
        
        const idBuscado = String(id)
        return canciones.filter(cancion => {
            const idCancion = String(cancion.idcancion)
            return idCancion === idBuscado
        })
    }



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


    // Handler para envío del formulario
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
            const response = await fetch(`${Config.urlapi}api/songs/${datosCancion._id}`, {
                method: 'PUT',
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


            setCargando(false)
            setIsSubmitting(false)

            refreshHimnario(himnario)

            // Redirigir sin recargar la página
            setTimeout(() => {
                history.replace(`/cancionero/${himnario}/${id}`)
            }, 1000) // Pequeño delay para mostrar mensaje de éxito

        } catch (error) {
            console.error('Error al editar canción:', error)
            setCargando(false)
            setIsSubmitting(false)
        }
    }

    // Handler para resetear el ID
    const handleClickReset = () => {
        setDatosCancion(prev => ({
            ...prev,
            idcancion: idActual
        }))
        setRespuestaId('')
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
                    <Btnback url={`/cancionero/${himnario}/${id}`}/>
                </div>
                <div className="box_headernew-title">
                    <h5>EDITAR CANCION</h5>
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

export default Editcancion
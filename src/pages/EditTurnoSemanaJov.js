import React, { useContext, useEffect, useState } from 'react'
import EditarSemana from '../components/FormSemanaJov'
import Config from '../config'
import SesionContext from '../context/sesion'
import Loader from '../components/Loader'

function EditTurnoSemanaJov (props) {
    const {existeSesion} = useContext(SesionContext)

    const [datosTurno, setDatosTurno] = useState({
        idsemana_jov: '1',
        idmes: '1',
        idgrupo: '1',
        fecha: '2022-01-01'
    })
    const [estado, setEstado] = useState({estado: true, mensaje: ''})

    useEffect(() => {
        setEstado({estado: false})
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            existeSesion()
            traerDatos()

            setEstado({estado: true})
        } else {
            props.history.push('/actividades')
        }
        // eslint-disable-next-line
    }, [])

    const traerDatos = async () => {
        await fetch(`${Config.urlapi}/cronograma/getTurnoSemanaJov.php?id=${props.match.params.id}`)
            .then((response) => response.json())
            .then((data) => setDatosTurno(data))
    }

    const handleChange = (event) => {
        setDatosTurno({
            ...datosTurno,
            [event.target.name] : event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setEstado({estado: false})
        try {
            await fetch(`${Config.urlapi}/cronograma/setTurnoJovenes.php`, {method: 'POST', body: JSON.stringify(datosTurno)})
            .then((response) => response.json())
            .then((data) => setEstado({estado: true, mensaje: data.estado}))
        
            await caches.open('memoria-v1')
            .then(cache => {
                cache.delete(`${Config.urlapi}/cronograma/getTurnoJovenes.php`)
                    .then(async response => {
                        if(response) {
                            await caches.open('memoria-v1')
                            .then(cache => {
                                return cache.add(`${Config.urlapi}/cronograma/getTurnoJovenes.php`)
                            })
                            setEstado({estado: false})
                            props.history.push(`/actividades`)
                            window.location.reload()
                        }
                    })
                })
        } catch (error) {
            console.log('Ocurrio un error al traer datos')
        }
    }

    if (!estado.estado) {
        return (
            <div className='container d-flex justify-content-center mt-3'><Loader/></div>
        )
    }

    return (
        <div className='container mt-3'>
            <EditarSemana datos={datosTurno} onChange={handleChange} onSubmit={handleSubmit} respuesta={estado.mensaje}/>
        </div>
    )
}

export default EditTurnoSemanaJov
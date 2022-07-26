import React, { useContext, useEffect, useState } from 'react'
import EditarSemana from '../components/FormSemanaJov'
import Config from '../config'
import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'
import Loader from '../components/Loader'

function EditTurnoSemanaJov (props) {
    const {existeSesion} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)

    const [datosTurno, setDatosTurno] = useState({
        idsemana_jov: '1',
        idmes: '1',
        idgrupo: '1',
        fecha: '2022-01-01'
    })
    const [estado, setEstado] = useState({estado: true, mensaje: ''})

    const [meses, setMeses] = useState([])
    const [ministerios, setMinisterios] = useState([])

    useEffect(() => {
        localStorage.setItem('pagina', '3')
        setPage('3')
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            existeSesion()
            traerDatos()

        } else {
            props.history.push('/actividades')
        }
        // eslint-disable-next-line
    }, [])

    const traerDatos = async () => {
        setEstado({...estado, estado:false})
        await fetch(`${Config.urlapi}/cronograma/getTurnoSemanaJov.php?id=${props.match.params.id}`)
            .then((response) => response.json())
            .then((data) => setDatosTurno(data))
        await fetch(`${Config.urlapi}/cronograma/getMeses.php`)
            .then(response => response.json())
            .then(data => setMeses(data))
        await fetch(`${Config.urlapi}/cronograma/getMinisterios.php`)
            .then(response => response.json())
            .then(data => setMinisterios(data))
        setEstado({...estado, estado:true})
    }

    const handleChange = (event) => {
        setDatosTurno({
            ...datosTurno,
            [event.target.name] : event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setEstado({...estado, estado:false})
        try {
            await fetch(`${Config.urlapi}/cronograma/setTurnoJovenes.php`, {method: 'POST', body: JSON.stringify(datosTurno)})
            .then((response) => response.json())
            .then((data) => setEstado({mensaje: data.estado}))
        
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
            <EditarSemana datos={datosTurno} onChange={handleChange} onSubmit={handleSubmit} respuesta={estado.mensaje} meses={meses} ministerios={ministerios}/>
        </div>
    )
}

export default EditTurnoSemanaJov
import { useState, useEffect, useContext } from 'react'
import Config from '../config'
import SesionContext from '../context/sesion'
import Loader from '../components/Loader'

function EditNombreMes (props) {
    const {existeSesion} = useContext(SesionContext)
    const [datos, setDatos] = useState({
        idmes: 1,
        nom_mes: ''
    })
    const [estado, setEstado] = useState({
        estado: true,
        mensaje: ''
    })

    useEffect(() => {
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            existeSesion()
            traerDatos()
        } else {
            props.history.push(`/actividades`)
        }
        // eslint-disable-next-line
    }, [])

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setEstado({...estado, estado: false})
        try {
            await fetch(`${Config.urlapi}/cronograma/setMes.php`, {method: 'POST', body: JSON.stringify(datos)})
                .then(response => response.json())
                .then(res => setEstado({mensaje: res.estado}))

            await caches.open('memoria-v1')
            .then(cache => {
                cache.delete(`${Config.urlapi}/cronograma/getTurnoMensual.php`)
                    .then(async response => {
                        if(response) {
                            await caches.open('memoria-v1')
                            .then(cache => {
                                return cache.add(`${Config.urlapi}/cronograma/getTurnoMensual.php`)
                            })
                            setEstado({estado: false})
                            props.history.push(`/actividades`)
                            window.location.reload()
                        }
                    })
                })
        } catch (error) {
            console.log('Hubo un error al guardar')
        }
    }

    const traerDatos = async () => {
        setEstado({
            ...estado,
            estado: false
        })
        await fetch(`${Config.urlapi}/cronograma/getMes.php?id=${props.match.params.id}`)
            .then(response => response.json())
            .then(data => setDatos(data))
        setEstado({...estado, estado:true})
    }

    if (!estado.estado) {
        return (
            <div className="container d-flex justify-content-center mt-3"><Loader/></div>
        )
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate id='form-nom_mes'>
                <h4 className='text-center text-secondary mt-3'>Editar nombre de mes</h4>
                <label className="label-control text-secondary">ID de mes: {props.match.params.id}</label>
               <div className='form-group'>
                    <label htmlFor="nom_mes" className="label-control text-secondary mt-3">Mes:</label>
                    <input type="text" className="form-control" name="nom_mes" id="nom_mes" value={datos.nom_mes} onChange={handleChange} required/>
               </div>
               <input value="Guardar cambios" type="submit" className="btn btn-primary w-100"/>
            </form>
        </div>
    )
}

export default EditNombreMes
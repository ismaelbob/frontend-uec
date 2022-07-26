import { useEffect, useState, useContext } from "react"
import Formsemana from "../components/Formsemana"
import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'
import Config from '../config'
import Loading from '../components/Loader'

function Editcronograma (props) {

    const {existeSesion} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)

    const [datosSemana, setDatosSemana] = useState({
        nom_grupo: '',
        domingo: '',
        martes: '',
        jueves: '',
    })
    const [estado, setEstado] = useState({
        estado: true,
        mensaje: ''
    })
    const [meses, setMeses] = useState([])
    const [ministerios, setMinisterios] = useState([])

    useEffect(() => {
        localStorage.setItem('pagina', '3')
        setPage('3')
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            existeSesion()
            traerDatos()
        } else {
            props.history.push(`/actividades`)
        }
        // eslint-disable-next-line
    }, [])

    const traerDatos = async () => {
        setEstado({...estado, estado:false})
        await fetch(`${Config.urlapi}/cronograma/getTurnoSemana.php?id=${props.match.params.id}`)
            .then(response => response.json())
            .then(data => setDatosSemana(data))
        await fetch(`${Config.urlapi}/cronograma/getMeses.php`)
            .then(response => response.json())
            .then(data => setMeses(data))
        await fetch(`${Config.urlapi}/cronograma/getMinisterios.php`)
            .then(response => response.json())
            .then(data => setMinisterios(data))
        setEstado({...estado, estado:true})
    }

    const handleChange = (e) => {
        setDatosSemana({
            ...datosSemana,
            [e.target.name] : e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setEstado({
            ...estado,
            estado: false
        })
        try {
            await fetch(`${Config.urlapi}/cronograma/setTurnoSemana.php`, {method: 'POST', body: JSON.stringify(datosSemana)})
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


    
    if (!estado.estado) {
        return (
            <div className="container d-flex justify-content-center mt-3"><Loading/></div>
        )
    }

    return (
        <div className="container mt-3">
            <div className="head_titulo mb-3">Editar semana</div>
            <Formsemana datos={datosSemana} onChange={handleChange} onSubmit={handleSubmit} respuesta={estado.mensaje} meses={meses} ministerios={ministerios}/>
        </div>
    )
}

export default Editcronograma
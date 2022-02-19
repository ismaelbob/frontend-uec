import { useEffect, useState, useContext } from "react"
import Formsemana from "../components/Formsemana"
import SesionContext from '../context/sesion'
import ActividadesContext from '../context/actividades'

function Editcronograma (props) {
    const {turnosJov, turnos, getDatos} = useContext(ActividadesContext)
    const {existeSesion} = useContext(SesionContext)

    const [datosSemana, setDatosSemana] = useState({
        nom_grupo: '',
        domingo: '',
        martes: '',
        jueves: '',
    })

    useEffect(() => {
        if (!turnos?.length || !turnosJov?.length) {
            getDatos()
        }
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }

        setDatosSemana(turnos[props.match.params.id - 1])
        // eslint-disable-next-line
    }, [])


    const handleChange = (e) => {
        setDatosSemana({
            ...datosSemana,
            [e.target.name] : e.target.value,
        })
    }

    return (
        <div className="container mt-3">
            <div className="head_titulo mb-3">Editar semana</div>
            <Formsemana datos={datosSemana} onChange={handleChange}/>
        </div>
    )
}

export default Editcronograma
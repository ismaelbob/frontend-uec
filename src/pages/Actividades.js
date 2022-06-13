import React, { useContext, useEffect} from 'react'
import './styles/actividades.css'
import Cronograma from '../components/Cronograma'
import Loader from '../components/Loader'
import ActividadesContext from '../context/actividades'
import SesionContext from '../context/sesion'
import Footer from '../components/Footer'

function Actividades () {
    const {cargando, turnosJov, turnos, getDatos} = useContext(ActividadesContext)
    const {existeSesion, usuario, nivel} = useContext(SesionContext)

    useEffect(() => {
        getDatos()
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }

        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        //
    }, [turnos])

    if (cargando) {
        return(
            <div className="container text-center mt-3">
                <Loader/>
            </div>
        )
    }
    return (
        <div className="container">
            <Cronograma turnoMensual={turnos} turnoJovenes={turnosJov} usuario={usuario} nivel={nivel}/>
            <Footer/>
        </div>
    )
}

export default Actividades
import { useState, useEffect, useContext } from 'react'
import './styles/showcancion.css'
import Btnedit from '../components/Btnedit'
import Btnplay from '../components/Btnplay'
import Btnback from '../components/Btnback'
import Loader from '../components/Loader'

import HimnarioContext from '../context/himnario'
import SesionContext from '../context/sesion'

function Showcancion (props) {
    const [datoCancion, setDatoCancion] = useState([])
    const {datos, estado, getDatos} = useContext(HimnarioContext)
    const {nombre} = useContext(SesionContext)

    useEffect(() => {
        if (!datos?.length) {
            getDatos(props.match.params.himnario)
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        setDatoCancion(datos[props.match.params.id - 1])
        setDatoCancion(datos[props.match.params.id - 1])
        // eslint-disable-next-line
    }, [datos])

    if (!estado || datoCancion.length === 0) {
        return (
            <div className="container d-flex justify-content-center mt-2">
                <Loader/>
            </div>
        )
    }

    let versos = []
    if (datoCancion.letra.includes('\r\n\r\n')) {
        versos = datoCancion.letra.split('\r\n\r\n')
    } else {
        if (datoCancion.letra.includes('\n\n')) {
            versos = datoCancion.letra.split('\n\n')
        }
    }
    return (
        <div className="container mt-2 d-flex flex-column align-items-center">
            <div className="box_header">
                <div><h5>{datoCancion.idcancion}</h5></div>
                <div className="box_header-title">
                    <h5>{datoCancion.titulo}</h5>
                    <h6>{datoCancion.autor}</h6>
                </div>
                <div>
                    {datoCancion.nota}
                </div>
                <div className="menu_buttom">
                    <div className="box_button-back"><Btnback url={`/cancionero/${props.match.params.himnario}`}/></div>
                    {datoCancion.enlace !== '' && <div className="box_botton-play"><Btnplay url={datoCancion.enlace}/></div>}
                    {nombre && <div className="menu_buttom-edit"><Btnedit url={`/cancionero/editar/${props.match.params.himnario}/${datoCancion.idcancion}`}/></div>}
                </div>
            </div>

            <div className="position-relative w-100">
            </div>

            <div className="box_contenido">
                {versos.map((verso, id) => {
                    return (
                        <div
                            className={verso.charAt(0) === '%'? 'box_contenido-coro': 'box_contenido-verso'} 
                            key={id}
                        >
                            {verso.charAt(0) === '%' ? verso.slice(1, verso.length - 1) : verso}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Showcancion
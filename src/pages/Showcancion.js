import { useState, useEffect, useContext } from 'react'
import './styles/showcancion.css'
import Btnedit from '../components/Btnedit'
import Btnback from '../components/Btnback'
import Loader from '../components/Loader'

import HimnarioContext from '../context/himnario'
import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'


function Showcancion (props) {
    const [cancionSeleccionada, setCancionSelecionada ] = useState([])
    const {datos, estado, getDatos} = useContext(HimnarioContext)
    const {nombre, existeSesion} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)

    const obtenerCanciones = () => {
        return datos?.songs || (Array.isArray(datos) ? datos : [])
    }

    useEffect(() => {
        localStorage.setItem('pagina', '2')
        setPage('2')
        
        const canciones = obtenerCanciones()
        if (!canciones.length) {
            getDatos(props.match.params.himnario)
        }
        
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (accessToken && refreshToken) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }

        const cancionesDisponibles = obtenerCanciones()
        if (cancionesDisponibles.length) {
            setCancionSelecionada(seleccionarCancion(props.match.params.id))
        }
        
        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        const canciones = obtenerCanciones()
        if (canciones.length) {
            setCancionSelecionada(seleccionarCancion(props.match.params.id))
        }
        // eslint-disable-next-line
    }, [datos])
    
    const seleccionarCancion = (id) => {
        const canciones = obtenerCanciones()
        if (!canciones.length) return []
        
        const idBuscado = String(id)
        return canciones.filter(cancion => {
            const idCancion = String(cancion.idcancion)
            return idCancion === idBuscado
        })
    }

    const canciones = obtenerCanciones()
    if (!estado || !canciones.length || cancionSeleccionada.length === 0) {
        return (
            <div className="container d-flex justify-content-center mt-2">
                <Loader/>
            </div>
        )
    }

    let versos = []
    if (cancionSeleccionada[0]?.letra) {
        if (cancionSeleccionada[0].letra.includes('\r\n\r\n')) {
            versos = cancionSeleccionada[0].letra.split('\r\n\r\n')
        } else if (cancionSeleccionada[0].letra.includes('\n\n')) {
            versos = cancionSeleccionada[0].letra.split('\n\n')
        }
    }

    return (
        <>
            <div className="container mt-2 d-flex flex-column align-items-center">
                <div className="box_header">
                    <div><h5>{cancionSeleccionada[0].idcancion}</h5></div>
                        <div className="box_header-title">
                            <h5>{cancionSeleccionada[0].titulo}</h5>
                            <h6>{cancionSeleccionada[0].autor}</h6>
                        </div>
                    <div>
                        {cancionSeleccionada[0].nota}
                    </div>
                    <div className="menu_buttom">
                        <div className="box_button-back"><Btnback url={`/cancionero/${props.match.params.himnario}`}/></div>
                        {nombre && <div className="menu_buttom-edit"><Btnedit url={`/cancionero/editar/${props.match.params.himnario}/${cancionSeleccionada[0].idcancion}`}/></div>}
                    </div>
                </div>
                <div className="position-relative w-100">

                </div>
                <div className="box_contenido">
                    {
                        versos.map((verso, id) => {
                            return (
                                <div
                                    className={verso.charAt(0) === '%'? 'box_contenido-coro': 'box_contenido-verso'} 
                                    key={id}
                                >
                                    {verso.charAt(0) === '%' ? verso.slice(1, verso.length - 1) : verso}
                                </div>
                            )
                        })
                    }
                </div>
                {
                    cancionSeleccionada[0].enlace !== '' && (
                    <div className="box_video">
                        <iframe 
                            src={cancionSeleccionada[0].enlace}
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    </div>
                    )
                }
            </div>
        </>
    )
}
export default Showcancion

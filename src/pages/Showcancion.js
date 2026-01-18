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

    // ✅ Función helper para obtener canciones (igual que en himnario.js)
    const obtenerCanciones = () => {
        return datos?.songs || (Array.isArray(datos) ? datos : [])
    }

    useEffect(() => {
        localStorage.setItem('pagina', '2')
        setPage('2')
        
        // ✅ Validación corregida usando la función helper
        const canciones = obtenerCanciones()
        if (!canciones.length) {
            getDatos(props.match.params.himnario)
        }
        
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }

        // ✅ Solo llamar seleccionarCancion si hay datos disponibles
        const cancionesDisponibles = obtenerCanciones()
        if (cancionesDisponibles.length) {
            setCancionSelecionada(seleccionarCancion(props.match.params.id))
        }
        
        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        // ✅ Solo ejecutar si hay datos disponibles
        const canciones = obtenerCanciones()
        if (canciones.length) {
            setCancionSelecionada(seleccionarCancion(props.match.params.id))
        }
        // eslint-disable-next-line
    }, [datos])
    
    // ✅ Función corregida: usa obtenerCanciones() en lugar de datos directamente
    const seleccionarCancion = (id) => {
        const canciones = obtenerCanciones()
        // ✅ Validación adicional de seguridad
        if (!canciones.length) return []
        
        // ✅ Convertir id a string para comparación consistente
        const idBuscado = String(id)
        
        return canciones.filter(cancion => {
            // ✅ Convertir idcancion a string y comparar, o comparar ambos como números
            const idCancion = String(cancion.idcancion)
            return idCancion === idBuscado
        })
    }

    // ✅ Validación mejorada
    const canciones = obtenerCanciones()
    if (!estado || !canciones.length || cancionSeleccionada.length === 0) {
        return (
            <div className="container d-flex justify-content-center mt-2">
                <Loader/>
            </div>
        )
    }

    // ✅ Validación de seguridad antes de acceder a propiedades
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

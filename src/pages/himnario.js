import {useContext, useEffect, useMemo, useState} from 'react'
import './styles/himnario.css'
import Btnadd from '../components/Btnadd'
import Btnback from '../components/Btnback'
import Searchbox from '../components/Searchbox'
import Cancion from '../components/Cancion'
import Loader from '../components/Loader'

import HimnarioContext from '../context/himnario'
import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'

function Himnario (props) {
    const [buscar, setBuscar] = useState('')
    const {datos, getDatos} = useContext(HimnarioContext)
    const {nombre, existeSesion} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)


    useEffect(() => {
        localStorage.setItem('pagina', '2')
        setPage('2')
        const canciones = datos?.songs || (Array.isArray(datos) ? datos : [])
        if (!canciones.length) {
            getDatos(props.match.params.himnario)
        }
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }
        // eslint-disable-next-line
    }, [])

    const datosFiltrados = useMemo(() => {
        const canciones = datos?.songs || (Array.isArray(datos) ? datos : [])
        
        if (!canciones.length) return []
        
        return canciones.filter(cancion => {
            return `${cancion.idcancion} ${cancion.titulo} ${cancion.letra}`
                .toLowerCase()
                .includes(buscar.toLowerCase())
        })
    }, [datos, buscar])

    const handleChange = ({target: {value}}) => {
        setBuscar(value)
    }

    const handleClick = (event) => {
        setBuscar('')
    }

    const canciones = datos?.songs || (Array.isArray(datos) ? datos : [])
    if(!canciones.length) {
        return (
            <div className="container mt-2 d-flex justify-content-center">
                <Loader/>
            </div>
        )
    }


    let titulo = props.match.params.himnario
    if (titulo === 'verde') {
        titulo = 'Himnario Verde'
    } else {
        if (titulo === 'poder') {
            titulo = 'Himnario Poder'
        } else {
            titulo = 'Himnario de Jóvenes'
        }
    }

    if (datosFiltrados.length === 0) {
        return (
            <div className="container">
                <h4 className="text-center mt-3 mt-md-2">{titulo}</h4>
                <div className="barra_menu">
                    <div className="barra_menu-buttom">
                        <div className="barra_menu-buttom-back"><Btnback url="/cancionero"/></div>
                        {
                            nombre && <div className="barra_menu-buttom-add"><Btnadd url={`/cancionero/nuevacancion/${props.match.params.himnario}`}/></div>
                        }
                    </div>
                    <div className="barra_menu-search"><Searchbox buscar={handleChange} val={buscar} onClick={handleClick}/></div>
                    <div className="barra_menu-relleno"></div>
                </div>
                
                <div className="text-center mt-2">
                    <h6>No hay resultados</h6>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <h4 className="text-center mt-3 mt-md-2">{titulo}</h4>
            <div className="barra_menu">
                <div className="barra_menu-buttom">
                    <div className="barra_menu-buttom-back"><Btnback url="/cancionero"/></div>
                    {
                        nombre && <div className="barra_menu-buttom-add"><Btnadd url={`/cancionero/nuevacancion/${props.match.params.himnario}`}/></div>
                    }
                </div>
                <div className="barra_menu-search"><Searchbox buscar={handleChange} val={buscar} onClick={handleClick}/></div>
                <div className="barra_menu-relleno"></div>
            </div>

            <div>
                {datosFiltrados.map(cancion => {
                    return (
                        <Cancion key={cancion.idcancion} cancion={cancion} himnario={props.match.params.himnario}/>
                    )
                })}
                <div className="mb-5 p-1"></div>
            </div>
        </div>
    )

}

export default Himnario
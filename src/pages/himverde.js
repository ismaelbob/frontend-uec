import {useContext, useEffect, useMemo, useState} from 'react'
import './styles/himverde.css'
import Btnadd from '../components/Btnadd'
import Btnback from '../components/Btnback'
import Searchbox from '../components/Searchbox'
import Cancion from '../components/Cancion'
import Loader from '../components/Loader'

import HimnarioContext from '../context'

function Himverde () {
    const [buscar, setBuscar] = useState('')
    const [datosFiltrados, setDatosFiltrados] = useState([])

    const {datos, getDatos} = useContext(HimnarioContext)


    useEffect(() => {
        if (!datos?.length) {
            getDatos()
        }
    }, [])

    useMemo(() => {
        const resultado = datos.filter(cancion => {
            return `${cancion.idcancion} ${cancion.titulo} ${cancion.letra}`
                .toLowerCase()
                .includes(buscar.toLowerCase())
        })
        setDatosFiltrados(resultado)
    }, [datos, buscar])

    const handleChange = ({target: {value}}) => {
        setBuscar(value)
    }

    const handleClick = (event) => {
        setBuscar('')
        setDatosFiltrados(datos)
    }

    if(datos.length === 0) {
        return (
            <div className="container mt-2 d-flex justify-content-center">
                <Loader/>
            </div>
        )
    }

    if (datosFiltrados.length === 0) {
        return (
            <div className="container">
                <h4 className="text-center mt-3 mt-md-2">Himnario verde</h4>
                <div className="barra_menu">
                    <div className="barra_menu-back"><Btnback url="/cancionero"/></div>
                    <div className="barra_menu-search"><Searchbox buscar={handleChange} val={buscar} onClick={handleClick}/></div>
                    <div className="barra_menu-add"><Btnadd url="/cancionero/nuevacancion/:him_verde"/></div>
                </div>
                <div className="text-center mt-2">
                    <h6>No hay resultados</h6>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <h4 className="text-center mt-3 mt-md-2">Himnario verde</h4>
            <div className="barra_menu">
                <div className="barra_menu-back"><Btnback url="/cancionero"/></div>
                <div className="barra_menu-search"><Searchbox buscar={handleChange} val={buscar} onClick={handleClick}/></div>
                <div className="barra_menu-add"><Btnadd url="/cancionero/nuevacancion/himnarioverde"/></div>
            </div>
            <div>
                {datosFiltrados.map(cancion => {
                    return (
                        <Cancion key={cancion.idcancion} cancion={cancion}/>
                    )
                })}
            </div>
        </div>
    )

}

export default Himverde
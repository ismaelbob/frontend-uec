import {useContext, useEffect, useMemo, useState} from 'react'
import { useParams } from 'react-router-dom'
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
    const { himnario } = useParams()
    const [buscar, setBuscar] = useState('')
    const [soloFavoritos, setSoloFavoritos] = useState(false)
    const {datos, getDatos, loading, toggleFavorite} = useContext(HimnarioContext)
    const {nombre, nivel, existeSesion, usuario} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)


    useEffect(() => {
        localStorage.setItem('pagina', '2')
        setPage('2')
        getDatos(himnario)

        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (accessToken && refreshToken) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }
        // eslint-disable-next-line
    }, [himnario])

    useEffect(() => {
        const savedFilter = localStorage.getItem(`favoritos_filter_${himnario}`)
        setSoloFavoritos(savedFilter === 'true')
    }, [himnario])

    const datosFiltrados = useMemo(() => {
        const canciones = datos?.songs || (Array.isArray(datos) ? datos : [])
        
        if (!canciones.length) return []
        
        return canciones.filter(cancion => {
            const coincideBusqueda = `${cancion.idcancion} ${cancion.titulo} ${cancion.letra}`
                .toLowerCase()
                .includes(buscar.toLowerCase())
            const coincideFavorito = soloFavoritos ? cancion.isFavorite === true : true
            return coincideBusqueda && coincideFavorito
        })
    }, [datos, buscar, soloFavoritos])

    const favoritosCount = useMemo(() => {
        const canciones = datos?.songs || []
        return canciones.filter(c => c.isFavorite === true).length
    }, [datos])

    const handleChange = ({target: {value}}) => {
        setBuscar(value)
    }

    const handleClick = (event) => {
        setBuscar('')
    }

    const handleToggleFavoritos = () => {
        setSoloFavoritos(prev => {
            const newValue = !prev
            localStorage.setItem(`favoritos_filter_${himnario}`, newValue.toString())
            return newValue
        })
    }

    const handleToggleFavorite = async (himnario, songId, isFavorite) => {
        await toggleFavorite(himnario, songId, isFavorite)
    }

    const isLoggedIn = usuario !== null

    const canciones = datos?.songs || (Array.isArray(datos) ? datos : [])
    if(!canciones.length || loading || !datos) {
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
                            nombre && (nivel === 1 || nivel === 2) && <div className="barra_menu-buttom-add"><Btnadd url={`/cancionero/${props.match.params.himnario}/nuevacancion`}/></div>
                        }
                    </div>
                    <div className="barra_menu-search"><Searchbox buscar={handleChange} val={buscar} onClick={handleClick} soloFavoritos={soloFavoritos} onToggleFavoritos={handleToggleFavoritos} favoritosCount={favoritosCount}/></div>
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
                        nombre && (nivel === 1 || nivel === 2) && <div className="barra_menu-buttom-add"><Btnadd url={`/cancionero/${props.match.params.himnario}/nuevacancion`}/></div>
                    }
                </div>
                <div className="barra_menu-search"><Searchbox buscar={handleChange} val={buscar} onClick={handleClick} soloFavoritos={soloFavoritos} onToggleFavoritos={handleToggleFavoritos} favoritosCount={favoritosCount}/></div>
                <div className="barra_menu-relleno"></div>
            </div>

            <div>
                {datosFiltrados.map(cancion => {
                    return (
                        <Cancion 
                            key={cancion.idcancion} 
                            cancion={cancion} 
                            himnario={props.match.params.himnario}
                            isLoggedIn={isLoggedIn}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    )
                })}
                <div className="mb-5 p-1"></div>
            </div>
        </div>
    )

}

export default Himnario
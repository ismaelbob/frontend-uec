import React, {useEffect, useContext, useState} from 'react'
import Footer from '../components/Footer'
import './styles/cancionero.css'
import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'
import Loader from '../components/Loader'

function Cancionero () {
    const {existeSesion} = useContext(SesionContext)
    const {setPage} = useContext(MenuActivoContext)
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        localStorage.setItem('pagina', '2')
        setPage('2')
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }
        
        // eslint-disable-next-line
    }, [])

    if (cargando) {
        return (
            <div className="container mt-2 d-flex justify-content-center"><Loader/></div>
        )
    }

    return (
        <div className="container screen_principal">
            <h4 className="text-center mt-3">HIMNARIOS</h4>
            <div className="row d-flex justify-content-center mb-4">
                <a href="cancionero/himverde" onClick={e => setCargando(true)}>
                    <div className="box_himnarioverde">
                        <div className="box_himnario-title">
                            Verde
                        </div>
                    </div>
                </a>
                <a href="cancionero/himpoder" onClick={e => setCargando(true)} className="mx-md-4 mx-0 my-4 my-md-0">
                    <div className="box_himnariopoder">
                        <div className="box_himnario-title">
                            Poder
                        </div>
                    </div>
                </a>
                <a href="cancionero/himjovenes" onClick={e => setCargando(true)}>
                    <div className="box_himnariojovenes">
                        <div className="box_himnario-title">
                            Jóvenes
                        </div>
                    </div>
                </a>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="banner col-11 col-md-8 d-flex justify-content-center align-items-center">
                    <p>
                        Cantad alegres a Dios, habitantes de toda la tierra. Salmos 100:1
                    </p>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Cancionero
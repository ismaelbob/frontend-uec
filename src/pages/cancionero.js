import React, {useEffect, useContext} from 'react'
import Footer from '../components/Footer'
import './styles/cancionero.css'
import SesionContext from '../context/sesion'

function Cancionero () {
    const {existeSesion} = useContext(SesionContext)
    //const btnActualizarLista = document.getElementById('btn-actualizar-lista')

    useEffect(() => {
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            const verificar = async () => {
                await existeSesion()
            }
            verificar()
        }
        
        window.addEventListener('online', enLinea)
        window.addEventListener('offline', fueraDeLinea)
        // eslint-disable-next-line
    }, [])

    const enLinea = () => {
        console.log('En linea')
    }
    const fueraDeLinea = () => {
        console.log('Fuera de linea')
    }

    return (
        <div className="container screen_principal">
            <div className='mt-3 d-flex justify-content-center'><button className="btn btn-primary" id="btn-actualizar-lista">Actualizar lista de canciones</button></div>
            <h4 className="text-center mt-3">HIMNARIOS</h4>
            <div className="row d-flex justify-content-center mb-4">
                <a href="cancionero/himverde">
                    <div className="box_himnarioverde">
                        <div className="box_himnario-title">
                            Verde
                        </div>
                    </div>
                </a>
                <a href="cancionero/himpoder" className="mx-md-4 mx-0 my-4 my-md-0">
                    <div className="box_himnariopoder">
                        <div className="box_himnario-title">
                            Poder
                        </div>
                    </div>
                </a>
                <a href="cancionero/himjovenes">
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
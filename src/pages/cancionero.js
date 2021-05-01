import React from 'react'
import {Link} from 'react-router-dom'
import './styles/cancionero.css'

class Cancionero extends React.Component {
    render () {
        return (
            <div className="container screen_principal">
                <h4 className="text-center mt-3">HIMNARIOS</h4>
                <div className="row d-flex justify-content-center mb-4">
                    <Link to="cancionero/himverde">
                        <div className="box_himnarioverde">
                            <div className="box_himnario-title">
                                Verde
                            </div>
                        </div>
                    </Link>
                    <Link to="cancionero/himpoder" className="mx-md-4 mx-0 my-4 my-md-0">
                        <div className="box_himnariopoder">
                            <div className="box_himnario-title">
                                Poder
                            </div>
                        </div>
                    </Link>
                    <Link to="cancionero/himjovenes">
                        <div className="box_himnariojovenes">
                            <div className="box_himnario-title">
                                Jóvenes
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="banner col-11 col-md-8 d-flex justify-content-center align-items-center">
                        <p>
                            Cantad alegres a Dios, habitantes de toda la tierra. Salmos 100:1
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cancionero
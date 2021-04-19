import React from 'react'
import './styles/addcancion.css'
import Btnback from '../components/Btnback'

class Addcancion extends React.Component {
    render () {
        return (
            <div className="container mt-2">
                <div className="box_headernew">
                    <div><Btnback url={`/cancionero/${this.props.match.params.himnario}`}/></div>
                    <div><h5>NUEVA CANCION</h5></div>
                    <div></div>
                </div>
                <form>
                    <div className="box_form mt-4">
                            <div className="row">
                                <div className="col-12 col-md-5">
                                    <div className="form-group">
                                        <label htmlFor="idcancion">Numero:</label>
                                        <input type="number" name="idcancion" id="idcancion" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="titulo">Titulo:</label>
                                        <input type="text" name="titulo" id="titulo" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="autor">Autor:</label>
                                        <input type="text" name="autor" id="autor" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nota">Nota:</label>
                                        <input type="text" name="nota" id="nota" className="form-control"/>
                                    </div>
                                   <div className="form-group">
                                        <label htmlFor="enlace">Enlace (opcional):</label>
                                        <input type="url" name="enlace" id="enlace" className="form-control"/>
                                   </div>
                                </div>
                                <div className="col-12 col-md-7">
                                    <label htmlFor="letra">Letra:</label>
                                    <textarea name="letra" id="letra" cols="30" rows="16" className="form-control"></textarea>
                                    <input type="button" value="Guardar" className="btn btn-primary my-4 w-100"/>
                                </div>
                            </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default Addcancion
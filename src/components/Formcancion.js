import React from 'react'
import './styles/formcancion.css'
import icon from '../img/refresh.svg'

class Formcancion extends React.Component {
    render () {
        return (
            <form onSubmit={this.props.onSubmit} className="needs-validation was-validated" noValidate>
                <div className="box_form mt-4">
                        <div className="row">
                            <div className="col-12 col-md-5">
                                <h5>Himnario {this.props.himnario.slice(8)}</h5>
                                <div className="form-group">
                                    <label htmlFor="idcancion">Numero:</label>
                                    <div className="d-flex">
                                        <button className="box_form-refreshbtn mr-1" type="button" onClick={this.props.onClick}><img src={icon} alt="i"/></button>
                                        <input type="number" name="idcancion" id="idcancion" className="form-control" autoComplete="off" required onChange={this.props.onChange} value={this.props.datos.idcancion}/>
                                    </div>
                                    {
                                        this.props.respuestaId !== 'Actual' || this.props.datos.idcancion === '' ? <div className={this.props.respuestaId === 'Disponible' ? 'text-success box_form-mgsid' : 'text-danger box_form-mgsid'}>{this.props.respuestaId}</div> : <div></div> 
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="titulo">Titulo:</label>
                                    <input type="text" name="titulo" id="titulo" className="form-control" autoComplete="off" required onChange={this.props.onChange} value={this.props.datos.titulo}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="autor">Autor:</label>
                                    <input type="text" name="autor" id="autor" className="form-control" autoComplete="off" required onChange={this.props.onChange} value={this.props.datos.autor}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nota">Nota:</label>
                                    <input type="text" name="nota" id="nota" className="form-control" autoComplete="off" required onChange={this.props.onChange} value={this.props.datos.nota}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="enlace">Enlace (opcional):</label>
                                    <input type="url" name="enlace" id="enlace" className="form-control" autoComplete="off" onChange={this.props.onChange} value={this.props.datos.enlace}/>
                                </div>
                            </div>
                            <div className="col-12 col-md-7">
                                <label htmlFor="letra">Letra:</label>
                                <textarea name="letra" id="letra" cols="30" rows="17" className="form-control" autoComplete="off" required onChange={this.props.onChange} value={this.props.datos.letra}></textarea>
                                {this.props.respuestaId === 'Disponible' && <input type="submit" value="Guardar" className="btn btn-primary my-4 w-100"/>}
                                {this.props.respuestaId === '' && <input type="submit" value="Guardar" className="btn btn-primary my-4 w-100"/>}

                                {this.props.respuesta === 'correcto' && (
                                    <div className="alert alert-success alert-dismissible fade show text-center box_form-message" role="alert">
                                        Correctamente guardado!
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                </div>
            </form>
        )
    }
}

export default Formcancion
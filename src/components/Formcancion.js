import './styles/formcancion.css'
import icon from '../img/refresh.svg'

function Formcancion({
    himnario,
    datos,
    onChange,
    onSubmit,
    respuesta,
    respuestaId,
    onClick,
    isSubmitting
}) {
    return (
        <form
            onSubmit={onSubmit}
            className="needs-validation"
            noValidate
            id="form-cancion"
        >
            <div className="box_form mt-4">
                <div className="row">
                    <div className="col-12 col-md-5">
                        <h5>Himnario {himnario}</h5>

                        <div className="form-group">
                            <label htmlFor="idcancion">Numero:</label>
                            <div className="d-flex">
                                <button
                                    className="box_form-refreshbtn"
                                    type="button"
                                    onClick={onClick}
                                >
                                    <img src={icon} alt="i" />
                                </button>

                                <input
                                    type="number"
                                    name="idcancion"
                                    id="idcancion"
                                    className="form-control"
                                    autoComplete="off"
                                    required
                                    onChange={onChange}
                                    value={datos.idcancion}
                                />
                            </div>

                            {(respuestaId !== 'Actual' || datos.idcancion === '') && (
                                <div
                                    className={
                                        respuestaId === 'Disponible'
                                            ? 'text-success box_form-mgsid'
                                            : 'text-danger box_form-mgsid'
                                    }
                                >
                                    {respuestaId}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="titulo">Titulo:</label>
                            <input
                                type="text"
                                name="titulo"
                                id="titulo"
                                className="form-control"
                                autoComplete="off"
                                required
                                onChange={onChange}
                                value={datos.titulo}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="autor">Autor:</label>
                            <input
                                type="text"
                                name="autor"
                                id="autor"
                                className="form-control"
                                autoComplete="off"
                                required
                                onChange={onChange}
                                value={datos.autor}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nota">Nota:</label>
                            <input
                                type="text"
                                name="nota"
                                id="nota"
                                className="form-control"
                                autoComplete="off"
                                required
                                onChange={onChange}
                                value={datos.nota}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="enlace">Enlace (opcional):</label>
                            <input
                                type="url"
                                name="enlace"
                                id="enlace"
                                className="form-control"
                                autoComplete="off"
                                onChange={onChange}
                                value={datos.enlace}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-7">
                        <label htmlFor="letra">Letra:</label>
                        <textarea
                            name="letra"
                            id="letra"
                            cols="30"
                            rows="17"
                            className="form-control"
                            autoComplete="off"
                            required
                            onChange={onChange}
                            value={datos.letra}
                        />

                        {(respuestaId === 'Disponible' || respuestaId === '') && (
                            <input
                                type="submit"
                                value={isSubmitting ? 'Guardando...' : 'Guardar'}
                                className="btn btn-primary my-4 w-100"
                                disabled={isSubmitting}
                            />
                        )}

                        {respuesta === 'correcto' && (
                            <div
                                className="alert alert-success alert-dismissible fade show text-center box_form-message"
                                role="alert"
                            >
                                Correctamente guardado!
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="alert"
                                    aria-label="Close"
                                >
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

export default Formcancion

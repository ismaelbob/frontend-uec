import React from "react";

function FormMes ({datos, onChange, onSubmit, respuesta}) {
    return (
        <form onSubmit={onSubmit}>
            <h4 className="text-center text-secondary">Editar turno de sabado</h4>
            <label className="col-12 col-form-label text-secondary">Semana: {datos.idsemana_jov}</label>
            <label htmlFor="idmes" className="col-12 col-form-label text-secondary">Mes:</label>
            <select name="idmes" id="idmes" className="form-control mb-3" value={datos.idmes} onChange={onChange}>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
            </select>
            <div className="form-group row">
                <div className="col-6">
                    <select className="form-control" id="idgrupo" name="idgrupo" value={datos.idgrupo} onChange={onChange}>
                        <option value="3">Ismael</option>
                        <option value="4">Even-Ezer</option>
                        <option value="5">Oriel</option>
                        <option value="6">Abdon</option>
                    </select>
                </div>
                <div className="col-6">
                    <input type="date" className="form-control" id="fecha" name="fecha" value={datos.fecha} onChange={onChange}/>
                </div>
            </div>
            <input type="submit" value="Guardar cambios" className="btn btn-primary w-100 mt-3" id="btn-guardar-form-mes"/>

            {respuesta === 'correcto' && (
                <div className="alert alert-success alert-dismissible fade show text-center box_form-message" role="alert">
                    Correctamente guardado!
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}
        </form>
    )
}

export default FormMes
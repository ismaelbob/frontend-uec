import React from "react";

function FormMes () {
    return (
        <form>
            <label for="txtmes" className="form-label text-secondary">Nombre del Mes:</label>
            <input type="text" name="txtmes" id="txtmes" className="form-control mb-3"/>
            <h6>Reunión de jóvenes</h6>
            <div className="row">
                <div className="col-6">
                    <label for="txtsabado1" className="form-label text-secondary">Sabado 1:</label>
                    <input type="date" name="txtsabado1" id="txtsabado1" className="form-control mb-3"/>
                    <label for="txtsabado2" className="form-label text-secondary">Sabado 2:</label>
                    <input type="date" name="txtsabado2" id="txtsabado2" className="form-control mb-3"/>
                    <label for="txtsabado3" className="form-label text-secondary">Sabado 3:</label>
                    <input type="date" name="txtsabado3" id="txtsabado3" className="form-control mb-3"/>
                </div>
                <div className="col-6">
                    <label for="txtsabado4" className="form-label text-secondary">Sabado 4:</label>
                    <input type="date" name="txtsabado4" id="txtsabado4" className="form-control mb-3"/>
                    <label for="txtsabado5" className="form-label text-secondary">Sabado 5:</label>
                    <input type="date" name="txtsabado5" id="txtsabado5" className="form-control mb-3"/>
                </div>
            </div>
            <input type="button" value="Guardar cambios" className="btn btn-primary w-100 mt-3" id="btn-guardar-form-mes"/>
        </form>
    )
}

export default FormMes
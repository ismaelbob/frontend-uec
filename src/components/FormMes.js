import React from "react";

function FormMes () {
    return (
        <form>
            <label htmlFor="txtmes" className="form-label text-secondary">Nombre del Mes:</label>
            <input type="text" name="txtmes" id="txtmes" className="form-control mb-3"/>
            <h6>Reunión de jóvenes</h6>
            <div className="form-group row">
                <label htmlFor="cmbsemana1" className="col-12 col-form-label text-secondary">Semana 1:</label>
                <div className="col-6">
                    <select className="form-control" id="cmbsemana1" name="cmbsemana1">
                        <option>Ismael</option>
                        <option>Even-Ezer</option>
                        <option>Oriel</option>
                    </select>
                </div>
                <div className="col-6">
                    <input type="date" className="form-control" id="txtsemana1" name="txtsemana1"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="cmbsemana2" className="col-12 col-form-label text-secondary">Semana 2:</label>
                <div className="col-6">
                    <select className="form-control" id="cmbsemana2" name="cmbsemana2">
                        <option>Ismael</option>
                        <option>Even-Ezer</option>
                        <option>Oriel</option>
                    </select>
                </div>
                <div className="col-6">
                    <input type="date" className="form-control" id="txtsemana2" name="txtsemana2"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="cmbsemana3" className="col-12 col-form-label text-secondary">Semana 3:</label>
                <div className="col-6">
                    <select className="form-control" id="cmbsemana3" name="cmbsemana3">
                        <option>Ismael</option>
                        <option>Even-Ezer</option>
                        <option>Oriel</option>
                    </select>
                </div>
                <div className="col-6">
                    <input type="date" className="form-control" id="txtsemana3" name="txtsemana3"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="cmbsemana4" className="col-12 col-form-label text-secondary">Semana 4:</label>
                <div className="col-6">
                    <select className="form-control" id="cmbsemana4" name="cmbsemana4">
                        <option>Ismael</option>
                        <option>Even-Ezer</option>
                        <option>Oriel</option>
                    </select>
                </div>
                <div className="col-6">
                    <input type="date" className="form-control" id="txtsemana4" name="txtsemana4"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="cmbsemana5" className="col-12 col-form-label text-secondary">Semana 5:</label>
                <div className="col-6">
                    <select className="form-control" id="cmbsemana5" name="cmbsemana5">
                        <option>Ismael</option>
                        <option>Even-Ezer</option>
                        <option>Oriel</option>
                    </select>
                </div>
                <div className="col-6">
                    <input type="date" className="form-control" id="txtsemana5" name="txtsemana5"/>
                </div>
            </div>
            <input type="button" value="Guardar cambios" className="btn btn-primary w-100 mt-3" id="btn-guardar-form-mes"/>
        </form>
    )
}

export default FormMes
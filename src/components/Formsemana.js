import React from 'react'

function Formsemana() {
    return (
        <form>
            <label htmlFor="cmbministerio" className="form-label text-secondary">Ministerio</label>
             <select className="form-control mb-3" id="cmbministerio" name="cmbministerio">
                <option>Ismael</option>
                <option>Even-Ezer</option>
                <option>Oriel</option>
            </select>
            <label htmlFor="txtdomingo" className="form-label text-secondary">Domingo</label>
            <input type="date" id="txtdomingo" name="txtdomingo" className="form-control mb-3"/>
            <label htmlFor="txtmartes" className="form-label text-secondary">Martes</label>
            <input type="date" id="txtmartes" name="txtmartes" className="form-control mb-3"/>
            <label htmlFor="txtjueves" className="form-label text-secondary">Jueves</label>
            <input type="date" id="txtjueves" name="txtjueves" className="form-control mb-3"/>
            <label htmlFor="txtcolor" className="form-label text-secondary">Color</label>
            <input type="text" id="txtcolor" name="txtcolor" className="form-control mb-3"/>
            <input type="button" value="Guardar cambios" className="btn btn-primary w-100 mt-3"/>
        </form>
    )
}

export default Formsemana
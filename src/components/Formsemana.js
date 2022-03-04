import React from 'react'

function Formsemana({datos, onChange, onSubmit, respuesta}) {
    return (
        <form onSubmit={onSubmit} className="needs-validation" noValidate>
            <label className='form-label text-secondary'>ID de Semana: {datos.idsemana}</label><br/>
            <label className='form-label text-secondary' htmlFor='idmes'>Mes:</label>
            <select name="idmes" id="idmes" className="form-control mb-3" value={datos.idmes} onChange={onChange}>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
            </select>
            <label htmlFor="idgrupo" className="form-label text-secondary">Ministerio</label>
             <select className="form-control mb-3" id="idgrupo" name="idgrupo" required onChange={onChange} value={datos.idgrupo}>
                <option value="1">Cuerdas</option>
                <option value="2">Pregoneros</option>
                <option value="3">SNT</option>
                <option value="4">Even-Ezer</option>
                <option value="5">Oriel</option>
                <option value="6">Abdon</option>
            </select>
            <label htmlFor="domingo" className="form-label text-secondary">Domingo</label>
            <input type="date" id="domingo" name="domingo" className="form-control mb-3" required onChange={onChange} value={datos.domingo}/>
            <label htmlFor="martes" className="form-label text-secondary">Martes</label>
            <input type="date" id="martes" name="martes" className="form-control mb-3" required onChange={onChange} value={datos.martes}/>
            <label htmlFor="jueves" className="form-label text-secondary">Jueves</label>
            <input type="date" id="jueves" name="jueves" className="form-control mb-3" required onChange={onChange} value={datos.jueves}/>
            <input type="submit" value="Guardar cambios" className="btn btn-primary w-100 mt-3"/>

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

export default Formsemana
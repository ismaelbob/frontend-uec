import React from 'react'

function Formsemana({datos, onChange}) {
    return (
        <form>
            <label htmlFor="nom_grupo" className="form-label text-secondary">Ministerio</label>
             <select className="form-control mb-3" id="nom_grupo" name="nom_grupo" onChange={onChange} value={datos.nom_grupo}>
                <option>Cuerdas</option>
                <option>Pregoneros</option>
                <option>SNT</option>
                <option>Even-Ezer</option>
                <option>Oriel</option>
                <option>Abdon</option>
            </select>
            <div className='text-secondary font-weight-bold mb-2'>Mes: {datos.nom_mes}</div>
            <label htmlFor="domingo" className="form-label text-secondary">Domingo</label>
            <input type="date" id="domingo" name="domingo" className="form-control mb-3" onChange={onChange} value={datos.domingo}/>
            <label htmlFor="martes" className="form-label text-secondary">Martes</label>
            <input type="date" id="martes" name="martes" className="form-control mb-3" onChange={onChange} value={datos.martes}/>
            <label htmlFor="jueves" className="form-label text-secondary">Jueves</label>
            <input type="date" id="jueves" name="jueves" className="form-control mb-3" onChange={onChange} value={datos.jueves}/>
            <input type="button" value="Guardar cambios" className="btn btn-primary w-100 mt-3"/>
        </form>
    )
}

export default Formsemana
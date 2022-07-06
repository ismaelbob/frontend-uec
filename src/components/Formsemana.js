import React from 'react'

function Formsemana({datos, onChange, onSubmit, respuesta, meses, ministerios}) {
    return (
        <form onSubmit={onSubmit} className="needs-validation" noValidate>
            <label className='form-label text-secondary'>ID de Semana: {datos.idsemana}</label><br/>
            <label className='form-label text-secondary' htmlFor='idmes'>Mes:</label>
            <select name="idmes" id="idmes" className="form-control mb-3" value={datos.idmes} onChange={onChange}>
                {
                    meses.map(mes => {
                        return <option key={mes.idmes} value={mes.idmes}>{mes.nom_mes}</option>
                    })
                }
            </select>
            <label htmlFor="idgrupo" className="form-label text-secondary">Ministerio</label>
             <select className="form-control mb-3" id="idgrupo" name="idgrupo" required onChange={onChange} value={datos.idgrupo}>
                {
                    ministerios.map(ministerio => {
                        return <option key={ministerio.idministerio} value={ministerio.idministerio}>{ministerio.nom_grupo}</option>
                    })
                }
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
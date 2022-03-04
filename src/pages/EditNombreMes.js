import react from 'react'

function EditNombreMes (props) {
    return (
        <div className='container'>
            <form>
                <h4 className='text-center text-secondary mt-3'>Editar nombre de mes</h4>
                <label className="label-control text-secondary">ID de mes: {props.match.params.id}</label>
               <div className='form-group'>
                    <label htmlFor="nom_mes" className="label-control text-secondary mt-3">Mes:</label>
                    <input type="text" className="form-control" name="nom_mes" id="nom_mes"/>
               </div>
               <input value="Guardar cambios" type="submit" className="btn btn-primary w-100"/>
            </form>
        </div>
    )
}

export default EditNombreMes
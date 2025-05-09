import React from 'react'
import Btnback from '../components/Btnback'
import Formcancion from '../components/Formcancion'
import Loader from '../components/Loader'
import Config from '../config'

import SesionContext from '../context/sesion'

class Editcancion extends React.Component {
    state = {
        datosCancion: {
            idcancion: '',
            titulo: '',
            autor: '',
            nota: '',
            letra: '',
            enlace: '',
        },
        cargando: true,
        errorMessage: null,
        respuesta: '',
        respuestaId: null,
        idcancionactual: '',
    }

    static contextType = SesionContext

    componentDidMount () {
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            this.traerDatosCancion()
            this.context.existeSesion()
        }
    }
    
    componentDidUpdate (prevProps, prevState) {
        if (this.state.datosCancion.idcancion !== prevState.datosCancion.idcancion) {
            fetch(`${Config.urlapi}/${this.props.match.params.himnario}/verificarExiste.php`, {method: 'POST', body: JSON.stringify(this.state.datosCancion.idcancion)})
                .then(response => response.json())
                .then(data =>  {
                    const idDataEntero = parseInt(data.id)
                    const idCancionActualEntero = parseInt(this.state.idcancionactual)
                    if (idDataEntero === idCancionActualEntero) {
                        this.setState({respuestaId: 'Disponible'})
                    } else {
                        this.setState({respuestaId: data.estado})
                    }
                })
        }
    }

    async traerDatosCancion () {
        this.setState({cargando: true, errorMessage: null})
        try {
            await fetch(`${Config.urlapi}/${this.props.match.params.himnario}/getcancion.php?id=${this.props.match.params.id}`)
                .then(response => response.json())
                .then(data => this.setState({datosCancion: data, cargando: false}))
            this.setState({idcancionactual: this.state.datosCancion.idcancion})
        } catch (error) {
            this.setState({cargando: false, errorMessage: error})
        }
    }


    handleChange = ({target: {name}, target: {value}}) => {
       this.setState({datosCancion: {
                ...this.state.datosCancion,
                [name]: value,
            },
        })
    }
    handleSumbit = async (event) => {
        event.preventDefault()
        this.setState({cargando: true, errorMessage: null})
        try {
            await fetch(`${Config.urlapi}/${this.props.match.params.himnario}/editcancion.php`, {method: 'POST', body: JSON.stringify(this.state.datosCancion)})
                .then(response => response.json())
                .then(res => this.setState({respuesta: res.estado}))

            /*await caches.open('memoria-v1')
                .then(cache => {
                    cache.delete(`${Config.urlapi}/${this.props.match.params.himnario}/getcanciones.php`)
                        .then(async response => {
                            if(response) {
                                await caches.open('memoria-v1')
                                .then(cache => {
                                    return cache.add(`${Config.urlapi}/${this.props.match.params.himnario}/getcanciones.php`)
                                })
                            }
                        })
                    })*/
            try {
                const cache = await caches.open('memoria-v1');
                const response = await cache.delete(`${Config.urlapi}/${this.props.match.params.himnario}/getcanciones.php`);
                if (!response) {
                    console.warn('El recurso no estaba en la caché, pero se procederá a agregarlo.');
                }
                await cache.add(`${Config.urlapi}/${this.props.match.params.himnario}/getcanciones.php`);
            } catch (error) {
                console.error('Error al actualizar la caché:', error);
            }
                    
            this.setState({cargando: false})
            this.props.history.push(`/cancionero/${this.props.match.params.himnario}/${this.props.match.params.id}`)
            window.location.reload()
        } catch (error) {
            this.setState({errorMessage: error, cargando: false})
        }
    }
    handleClickReset = () => {
        this.setState({datosCancion: {
            ...this.state.datosCancion,
            idcancion: this.state.idcancionactual
        }})
    }

    render () {
        if (!localStorage.getItem('user')) {
            this.props.history.push('/cancionero')
        }
        
        if (this.state.cargando) {
            return (
                <div className="container mt-2 d-flex justify-content-center">
                    <Loader/>
                </div>
            )
        }
        if (this.state.errorMessage) {
            return (
                <div className="container mt-2 d-flex justify-content-center">
                    <h6>Ocurrio un error, vuelva a cargar la pagina</h6>
                </div>
            )
        }
        return (
            <div className="container mt-2 mb-5">
                <div className="box_headernew">
                    <div className="box_headernew-back"><Btnback url={`/cancionero/${this.props.match.params.himnario}/${this.props.match.params.id}`}/></div>
                    <div className="box_headernew-title"><h5>EDITAR CANCION</h5></div>
                    <div></div>
                </div>
                <Formcancion 
                    himnario={this.props.match.params.himnario} 
                    datos={this.state.datosCancion} 
                    onChange={this.handleChange}
                    onSubmit={this.handleSumbit}
                    respuesta={this.state.respuesta}
                    respuestaId={this.state.respuestaId}
                    onClick={this.handleClickReset}
                />
            </div>
        )
    }
}

export default Editcancion
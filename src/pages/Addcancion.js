import React from 'react'
import './styles/addcancion.css'
import Btnback from '../components/Btnback'
import Formcancion from '../components/Formcancion'
import Loader from '../components/Loader'

class Addcancion extends React.Component {
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
        respuestaId: '',
        idcancionactual: '',
    }
    componentDidMount () {
        this.traerUltimoNumero()
    }

    componentDidUpdate (prevProps, prevState) {
        if(this.state.datosCancion.idcancion !== prevState.datosCancion.idcancion) {
            fetch('https://uecapi.herokuapp.com/himverde/verificarExiste.php', {method: 'POST', body: JSON.stringify(this.state.datosCancion.idcancion)})
                .then(response => response.json())
                .then(data =>  this.setState({respuestaId: data.estado}))
        }
    }

    async traerUltimoNumero () {
        this.setState({cargando: true, errorMessage: null})
        try {
            await fetch('https://uecapi.herokuapp.com/himverde/getUltimaCancion.php')
                .then(response => response.json())
                .then(data => this.setState({datosCancion: {
                    ...this.state.datosCancion,
                    idcancion: data
                }, cargando: false
            }))
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
            fetch('https://uecapi.herokuapp.com/himverde/addCancion.php', {method: 'POST', body: JSON.stringify(this.state.datosCancion)})
                .then(respuesta => respuesta.json())
                .then(data => this.setState({respuesta: data.estado}))
            this.setState({cargando: false})
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
        if (this.state.cargando) {
            return (
                <div className="container mt-2 d-flex justify-content-center">
                    <Loader/>
                </div>
            )
        }
        return (
            <div className="container mt-2">
                <div className="box_headernew">
                    <div><Btnback url={`/cancionero/${this.props.match.params.himnario}`}/></div>
                    <div><h5>NUEVA CANCION</h5></div>
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
export default Addcancion
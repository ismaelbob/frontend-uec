import React from 'react'
import './styles/addcancion.css'
import Btnback from '../components/Btnback'
import Formcancion from '../components/Formcancion'
import Loader from '../components/Loader'
import SesionContext from '../context/sesion'

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
    static contextType = SesionContext

    componentDidMount () {
        if (localStorage.getItem('user') && localStorage.getItem('pass')) {
            this.traerUltimoNumero()
            this.context.existeSesion()
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if(this.state.datosCancion.idcancion !== prevState.datosCancion.idcancion) {
            fetch(`https://uecapi.herokuapp.com/${this.props.match.params.himnario}/verificarExiste.php`, {method: 'POST', body: JSON.stringify(this.state.datosCancion.idcancion)})
                .then(response => response.json())
                .then(data =>  this.setState({respuestaId: data.estado}))
        }
    }

    async traerUltimoNumero () {
        this.setState({cargando: true, errorMessage: null})
        try {
            await fetch(`https://uecapi.herokuapp.com/${this.props.match.params.himnario}/getUltimaCancion.php`)
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
        const form = document.getElementById('form-cancion')
        if(this.state.datosCancion.idcancion === '' || this.state.datosCancion.titulo === '' || this.state.datosCancion.autor === '' || this.state.datosCancion.nota === '' || this.state.datosCancion.letra === '') {
            form.classList.add('was-validated')
        } else {
            this.setState({cargando: true, errorMessage: null})
            try {
                await fetch(`https://uecapi.herokuapp.com/${this.props.match.params.himnario}/addCancion.php`, {method: 'POST', body: JSON.stringify(this.state.datosCancion)})
                    .then(respuesta => respuesta.json())
                    .then(data => this.setState({respuesta: data.estado}))
                form.classList.remove('was-validated')
                this.setState({cargando: false, respuestaId: 'No disponible'})
                this.props.history.push(`/cancionero/${this.props.match.params.himnario}/${this.state.datosCancion.idcancion}`)
            } catch (error) {
                this.setState({errorMessage: error, cargando: false})
            }
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
        return (
            <div className="container mt-2">
                <div className="box_headernew">
                    <div className="box_headernew-back"><Btnback url={`/cancionero/${this.props.match.params.himnario}`}/></div>
                    <div className="box_headernew-title"><h5>NUEVA CANCION</h5></div>
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
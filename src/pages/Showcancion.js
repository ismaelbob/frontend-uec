import React from 'react'
import './styles/showcancion.css'
import Btnedit from '../components/Btnedit'
import Btnplay from '../components/Btnplay'
import Btnback from '../components/Btnback'
import Loader from '../components/Loader'

class Showcancion extends React.Component {
    state = {
        idcancion: null,
        datoCancion: [],
        versos: [],
    }
    componentDidMount () {
        this.setState({idcancion: this.props.match.params.id})
        this.getDatosCancion()
    }

    getDatosCancion = () => {
        fetch(`https://uecapi.herokuapp.com/himverde/getcancion.php?id=${this.props.match.params.id}`)
            .then( response => response.json())
            .then(data => this.setState({datoCancion: data}))
            .catch(error => console.log(`Ocurrio un error: ${error}`))
    }

    render () {
        if (this.state.datoCancion.length === 0) {
            return (
                <div className="container d-flex justify-content-center mt-2">
                    <Loader/>
                </div>
            )
        }
        const letraCorregida = this.state.datoCancion.letra
        const versos = letraCorregida.split('\r\n\r\n')
        return (
            <div className="container mt-2 d-flex flex-column align-items-center">
                <div className="box_header">
                    <div><h5>{this.state.datoCancion.idcancion}</h5></div>
                    <div className="box_header-title">
                        <h5>{this.state.datoCancion.titulo}</h5>
                        <h6>{this.state.datoCancion.autor}</h6>
                    </div>
                    <div>
                        {this.state.datoCancion.nota}
                    </div>
                </div>

                <div className="position-relative w-100">
                    <div className="menu_buttom">
                        <div className="box_button-back"><Btnback url='/cancionero/himnarioverde'/></div>
                        {this.state.datoCancion.enlace !== '' && <div className="box_botton-play"><Btnplay url={this.state.datoCancion.enlace}/></div>}
                        <div className="menu_buttom-edit"><Btnedit url="#"/></div>
                    </div>
                </div>

                <div className="box_contenido">
                    {versos.map((verso, id) => {
                        return (
                            <div 
                                className={verso.charAt(0) === '%'? 'box_contenido-coro': 'box_contenido-verso'} 
                                key={id}
                            >
                                {verso.charAt(0) === '%' ? verso.slice(1, verso.length - 1) : verso}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default Showcancion
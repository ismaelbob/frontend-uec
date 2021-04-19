import React from 'react'
import './styles/himverde.css'
import Btnadd from '../components/Btnadd'
import Btnback from '../components/Btnback'
import Searchbox from '../components/Searchbox'
import Loader from '../components/Loader'
import Cancion from '../components/Cancion'

class Himverde extends React.Component {
    state = {
        datos: [],
        buscar: '',
        datosFiltrados: [],
        buscando: true,
        error: null,
    }

    componentDidMount() {
        this.traerDatos()
    }

    traerDatos = async () => {
        this.setState({buscando: true, error: null})
        try {
            await fetch('https://uecapi.herokuapp.com/himverde/getcanciones.php')
                .then(response => response.json())
                .then(data => this.setState({datos: data, buscando: false}))
            this.setState({datosFiltrados: this.state.datos})
        } catch (error) {
            this.setState({buscando: false, error: error})
        }
    }
    handleChange = async ({target: {value}}) => {
        await this.setState({buscar: value})
        const resultado = await this.state.datos.filter(cancion => {
            return `${cancion.idcancion} ${cancion.titulo} ${cancion.letra}`
                .toLowerCase()
                .includes(this.state.buscar.toLowerCase())
        })
        this.setState({datosFiltrados: resultado})
    }
    handleClick = (event) => {
        this.setState({buscar: '', datosFiltrados: this.state.datos})
    }

    render () {
        if (this.state.buscando) {
            return (
                <div className="container d-flex justify-content-center mt-4">
                    <Loader/>
                </div>
            )
        }
        if (this.state.error) {
            return (
                <div className="container mt-2 d-flex justify-content-center">
                    Ocurrio un error al traer los datos, actualice la pagina
                </div>
            )
        }
        if (this.state.datosFiltrados.length === 0) {
            return (
                <div className="container">
                    <h4 className="text-center mt-3 mt-md-2">Himnario verde</h4>
                    <div className="barra_menu">
                        <div className="barra_menu-back"><Btnback url="/cancionero"/></div>
                        <div className="barra_menu-search"><Searchbox buscar={this.handleChange} val={this.state.buscar} onClick={this.handleClick}/></div>
                        <div className="barra_menu-add"><Btnadd url="/cancionero/nuevacancion/:him_verde"/></div>
                    </div>
                    <div className="text-center mt-2">
                        <h6>No hay resultados</h6>
                    </div>
                </div>
            )
        }
        return (
            <div className="container">
                <h4 className="text-center mt-3 mt-md-2">Himnario verde</h4>
                <div className="barra_menu">
                    <div className="barra_menu-back"><Btnback url="/cancionero"/></div>
                    <div className="barra_menu-search"><Searchbox buscar={this.handleChange} val={this.state.buscar} onClick={this.handleClick}/></div>
                    <div className="barra_menu-add"><Btnadd url="/cancionero/nuevacancion/himnarioverde"/></div>
                </div>
                <div>
                    {this.state.datosFiltrados.map(cancion => {
                        return (
                            <Cancion key={cancion.idcancion} cancion={cancion}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Himverde
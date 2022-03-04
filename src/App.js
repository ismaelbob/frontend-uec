import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/home'
import Cancionero from './pages/cancionero'
import Himnario from './pages/himnario'
import Showcancion from './pages/Showcancion'
import Addcancion from './pages/Addcancion'
import Editcancion from './pages/Editcancion'
import Actividades from './pages/Actividades'
import Ofrendas from './pages/Ofrendas'
import NotFound from './pages/NotFound'
import Usuario from './pages/Usuario'

import HimnarioProvider from './context/himnario/Provider'
import SesionProvider from './context/sesion/Provider'
import ActividadesProvider from './context/actividades/Provider'
import EditTurnoSemana from './pages/EditTurnoSemana'
import EditTurnoSemanaJov from './pages/EditTurnoSemanaJov'
import EditMes from './pages/EditNombreMes'
function App () {
    return (
        <BrowserRouter>
            <SesionProvider>
                <ActividadesProvider>
                    <HimnarioProvider>
                        <Layout>
                            <Switch>
                                <Route path="/" exact component={Home}/>
                                <Route path="/cancionero" exact component={Cancionero}/>
                                <Route path="/actividades" exact component={Actividades}/>
                                <Route path="/actividades/editarsemana/:id" exact component={EditTurnoSemana}/>
                                <Route path="/actividades/editarsemanajov/:id" exact component={EditTurnoSemanaJov}/>
                                <Route path="/actividades/editarmes/:id" exact component={EditMes}/>
                                <Route path="/ofrendas" exact component={Ofrendas}/>
                                <Route path="/login" exact component={Usuario}/>
                                <Route path="/cancionero/nuevacancion/:himnario" exact component={Addcancion}/>
                                <Route path="/cancionero/editar/:himnario/:id" exact component={Editcancion}/>
                                <Route path="/cancionero/:himnario" exact component={Himnario}/>
                                <Route path="/cancionero/:himnario/:id" exact component={Showcancion}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Layout>
                    </HimnarioProvider>
                </ActividadesProvider>
            </SesionProvider>
        </BrowserRouter>
    )
}

export default App
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

function App () {
    return (
        <BrowserRouter>
            <SesionProvider>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/cancionero" exact component={Cancionero}/>
                        <Route path="/actividades" exact component={Actividades}/>
                        <Route path="/ofrendas" exact component={Ofrendas}/>
                        <Route path="/login" exact component={Usuario}/>
                        <Route path="/cancionero/nuevacancion/:himnario" exact component={Addcancion}/>
                        <Route path="/cancionero/editar/:himnario/:id" exact component={Editcancion}/>
                        <HimnarioProvider>
                            <Switch>
                                <Route path="/cancionero/:himnario" exact component={Himnario}/>
                                <Route path="/cancionero/:himnario/:id" exact component={Showcancion}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </HimnarioProvider>
                        <Route component={NotFound}/>
                    </Switch>
                </Layout>
            </SesionProvider>
        </BrowserRouter>
    )
}

export default App
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/home'
import Cancionero from './pages/cancionero'
import Himverde from './pages/himverde'
import Showcancion from './pages/Showcancion'
import Addcancion from './pages/Addcancion'
import Noticias from './pages/Noticias'
import Ofrendas from './pages/Ofrendas'
import NotFound from './pages/NotFound'

import HimnarioProvider from './context/Provider'

function App () {
    return (
        <HimnarioProvider>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/cancionero" exact component={Cancionero}/>
                        <Route path="/cancionero/himnarioverde" exact component={Himverde}/>
                        <Route path="/cancionero/himnarioverde/:id" exact component={Showcancion}/>
                        <Route path="/cancionero/nuevacancion/:himnario" exact component={Addcancion}/>
                        <Route path="/noticias" exact component={Noticias}/>
                        <Route path="/ofrendas" exact component={Ofrendas}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        </HimnarioProvider>
    )
}

export default App
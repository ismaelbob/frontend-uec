import React, { useContext } from "react"
import './styles/footer.css'
import HomeContext from '../context/home'

const FALLBACK = {
    iglesia: 'Iglesia Evangelica Bautista',
    lema: '"Unidos en Cristo"',
    ciudad: 'Cochabamba',
    pais: 'Bolivia',
    anioFundacion: 2005
}

function Footer() {
    const {data} = useContext(HomeContext)
    const site = data ? data.site : {}
    const iglesia = site.iglesia || FALLBACK.iglesia
    const lema = site.lema || FALLBACK.lema
    const ciudad = site.ciudad || FALLBACK.ciudad
    const pais = site.pais || FALLBACK.pais
    const anioFundacion = site.anioFundacion || FALLBACK.anioFundacion
    const anioActual = site.anioactual || new Date().getFullYear()

    return (
        <div className="container fondo text-light mt-3 p-3">
            <div className="flex text-center">
                <div className="subtitulo">{iglesia}</div>
                <div className="titulo">{lema}</div>
            </div>
            <div className="flex text-center mt-3">
                <div>{ciudad} - {pais}</div>
                <div>{anioFundacion} - {anioActual}</div>
            </div>
            <div className="flex text-center pt-5">
                <div className="titulo-dev">developed by IsmaelBob</div>
            </div>
        </div>
    )
}

export default Footer
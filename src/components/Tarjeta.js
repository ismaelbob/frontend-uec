import React from 'react'
import './styles/tarjeta.css'
import whatsapp from '../img/wp.png'

function Tarjeta({icono, nombre, telefono, cargo, link}) {
    const linkWhatsapp = `https://api.whatsapp.com/send?phone=591${telefono}`
    return (
        <div className='tarjeta'>
            <div className='tarjeta_contenido'>
                <div className='tarjeta_contenido-icono'>
                    <img src={icono} alt=" " />
                </div>
                <div className='tarjeta_contenido-texto'>
                    <h6>{cargo}</h6>
                    <p>
                        {nombre}<br/>
                        <small>Cel.: {telefono}</small>
                    </p>
                </div>
                {
                    link === true ? 
                    <div className='tarjeta_contenido-boton'>
                        <a href={linkWhatsapp} target="_blank" rel='noreferrer'>
                            escribir
                            <img src={whatsapp} alt=" "/>
                        </a>
                    </div> 
                    : ""
                }
            </div>
        </div>
    )
}

export default Tarjeta
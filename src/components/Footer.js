import React from "react"
import './styles/footer.css'

function Footer() {
    return (
        <div className="container fondo text-light mt-3 p-3">
            <div className="flex text-center">
                <div className="subtitulo">Iglesia Evangelica Bautista</div>
                <div className="titulo">"Unidos en Cristo"</div>
            </div>
            <div className="flex text-center mt-3">
                <div>Cochabamba - Bolivia</div>
                <div>2005 - 2024</div>
            </div>
            <div className="flex text-center pt-5">
                <div className="titulo-dev">developed by IsmaelBob</div>
            </div>
        </div>
    )
}

export default Footer

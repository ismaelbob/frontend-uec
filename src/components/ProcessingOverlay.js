import React from 'react'
import './styles/processingoverlay.css'
import Loader from './Loader'

function ProcessingOverlay({ show }) {
    if (!show) return null

    return (
        <div className="overlay-bg">
            <div className="overlay-content">
                <Loader />
                <p className="overlay-text">Procesando...</p>
            </div>
        </div>
    )
}

export default ProcessingOverlay

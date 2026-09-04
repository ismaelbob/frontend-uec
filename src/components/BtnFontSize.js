import React from 'react'
import './styles/btnfontsize.css'

function BtnFontSize ({ size, onChange, min, max, step }) {
    const aumentar = () => {
        const nuevo = Math.min(size + step, max)
        if (nuevo !== size) onChange(nuevo)
    }

    const reducir = () => {
        const nuevo = Math.max(size - step, min)
        if (nuevo !== size) onChange(nuevo)
    }

    const disabledUp = size >= max
    const disabledDown = size <= min

    return (
        <div className="box_btnfontsize">
            <button
                type="button"
                className="btnfontsize-inner d-flex align-items-center justify-content-center"
                onClick={aumentar}
                disabled={disabledUp}
                aria-label="Aumentar tamaño de letra"
            >
                <div className="btnfontsize-letter">A+</div>
                <div className="btnfontsize-label">Agrandar</div>
            </button>
            <button
                type="button"
                className="btnfontsize-inner d-flex align-items-center justify-content-center"
                onClick={reducir}
                disabled={disabledDown}
                aria-label="Reducir tamaño de letra"
            >
                <div className="btnfontsize-letter">A-</div>
                <div className="btnfontsize-label">Reducir</div>
            </button>
        </div>
    )
}

export default BtnFontSize
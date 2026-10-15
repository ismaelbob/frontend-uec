import React from 'react'
import placeholder from '../../img/placeholder.svg'
import {urlImagenDrive, esUrlDrive} from '../../utils/driveUrl'

function ImagenPreview({ url, alt = 'Previsualización' }) {
    if (!url) {
        return (
            <div className="text-muted small mt-2">Ingresa una URL para ver la previsualización.</div>
        )
    }

    return (
        <div className="mt-2">
            <img
                src={urlImagenDrive(url)}
                alt={alt}
                referrerPolicy="no-referrer"
                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                onError={(e) => {
                    if (!e.target.dataset.fallback) {
                        e.target.dataset.fallback = 'true'
                        e.target.src = placeholder
                    }
                }}
            />
            {esUrlDrive(url) && (
                <div className="small mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Se usará: <code>drive.google.com/thumbnail?id=...</code>
                </div>
            )}
        </div>
    )
}

export default ImagenPreview

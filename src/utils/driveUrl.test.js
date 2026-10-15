import {extraerIdDrive, urlImagenDrive, esUrlDrive} from './driveUrl'

describe('driveUrl', () => {
    describe('extraerIdDrive', () => {
        it('extrae el ID de un enlace /file/d/ID', () => {
            expect(extraerIdDrive('https://drive.google.com/file/d/18DddqybCSz2jT9FBxw8_zVTdClMxOMOy/view?usp=sharing')).toBe('18DddqybCSz2jT9FBxw8_zVTdClMxOMOy')
        })

        it('extrae el ID de un enlace uc?export=view', () => {
            expect(extraerIdDrive('https://drive.google.com/uc?export=view&id=1ltd1klRlxNY_15PwlR5D_riNSCDRBvBl')).toBe('1ltd1klRlxNY_15PwlR5D_riNSCDRBvBl')
        })

        it('extrae el ID de un enlace lh3 /d/ID', () => {
            expect(extraerIdDrive('https://lh3.googleusercontent.com/d/1m-ViBizdcLlQv8Qcsb8XzX1xXAvWEC_C')).toBe('1m-ViBizdcLlQv8Qcsb8XzX1xXAvWEC_C')
        })

        it('extrae el ID de un enlace open?id=ID', () => {
            expect(extraerIdDrive('https://drive.google.com/open?id=1h_dHPkG28h0djMRXcdjdVjq5ZPgruBoh')).toBe('1h_dHPkG28h0djMRXcdjdVjq5ZPgruBoh')
        })

        it('extrae el ID de un enlace thumbnail', () => {
            expect(extraerIdDrive('https://drive.google.com/thumbnail?id=1l5s4ikUZRx2sIDSa2r3Av50IMMAZiGnt&sz=w1000')).toBe('1l5s4ikUZRx2sIDSa2r3Av50IMMAZiGnt')
        })

        it('devuelve null para URLs que no son de Google Drive', () => {
            expect(extraerIdDrive('https://example.com/foto.jpg')).toBeNull()
        })

        it('devuelve null para valores vacios o invalidos', () => {
            expect(extraerIdDrive('')).toBeNull()
            expect(extraerIdDrive(undefined)).toBeNull()
            expect(extraerIdDrive('no-es-una-url')).toBeNull()
        })
    })

    describe('urlImagenDrive', () => {
        it('convierte una URL de Drive al formato thumbnail', () => {
            expect(urlImagenDrive('https://drive.google.com/uc?export=view&id=abc123')).toBe('https://drive.google.com/thumbnail?id=abc123&sz=w2000')
        })

        it('deja intactas las URLs que no son de Drive', () => {
            expect(urlImagenDrive('https://example.com/foto.jpg')).toBe('https://example.com/foto.jpg')
        })

        it('devuelve el valor original si esta vacio', () => {
            expect(urlImagenDrive('')).toBe('')
            expect(urlImagenDrive(undefined)).toBeUndefined()
        })
    })

    describe('esUrlDrive', () => {
        it('detecta URLs de Drive', () => {
            expect(esUrlDrive('https://drive.google.com/file/d/abc123/view')).toBe(true)
        })

        it('rechaza URLs externas', () => {
            expect(esUrlDrive('https://example.com/foto.jpg')).toBe(false)
        })
    })
})

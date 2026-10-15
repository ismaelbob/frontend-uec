const HOSTS_GOOGLE = ['drive.google.com', 'docs.google.com', 'drive.usercontent.google.com', 'lh3.googleusercontent.com', 'lh3.google.com']

export function extraerIdDrive(value) {
    if (typeof value !== 'string' || value === '') return null

    let url
    try {
        url = new URL(value)
    } catch (error) {
        return null
    }

    if (!HOSTS_GOOGLE.includes(url.hostname)) return null

    const archivo = value.match(/\/file\/d\/([\w-]+)/)
    if (archivo) return archivo[1]

    const directo = value.match(/\/d\/([\w-]+)/)
    if (directo) return directo[1]

    const query = url.searchParams.get('id')
    if (query) return query

    return null
}

export function urlImagenDrive(value) {
    if (typeof value !== 'string' || value === '') return value

    const id = extraerIdDrive(value)
    if (!id) return value

    return `https://drive.google.com/thumbnail?id=${id}&sz=w2000`
}

export function esUrlDrive(value) {
    return extraerIdDrive(value) !== null
}

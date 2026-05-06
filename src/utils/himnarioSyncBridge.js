let postLoginSyncHandler = null

export const setPostLoginSyncHandler = (handler) => {
    postLoginSyncHandler = typeof handler === 'function' ? handler : null
}

export const runPostLoginSync = async () => {
    if (typeof postLoginSyncHandler === 'function') {
        await postLoginSyncHandler()
    }
}

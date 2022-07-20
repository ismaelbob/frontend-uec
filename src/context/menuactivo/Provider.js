import MenuActivoContext from './index'
import { useState } from 'react'

function MenuActivoProvider ({children}) {
    const pagina = localStorage.getItem('pagina')

    const [page, setPage] = useState(pagina)

    const handleClick = (event) => {
        setPage(event.target.id)
    }
    
    return (
        <MenuActivoContext.Provider value={{page,handleClick,setPage}}>
            {children}
        </MenuActivoContext.Provider>
    )
}

export default MenuActivoProvider
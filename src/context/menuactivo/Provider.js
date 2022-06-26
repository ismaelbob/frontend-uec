import MenuActivoContext from './index'
import { useState, useEffect } from 'react'

function MenuActivoProvider ({children}) {
    const pagina = localStorage.getItem('pagina')

    const [page, setPage] = useState(pagina)

    useEffect(()=>{
        setPage(pagina)
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        setPage(pagina)
    },[pagina])

    const handleClick = (event) => {
        setPage(event.target.id)
        console.log(event.target.id)
    }
    
    return (
        <MenuActivoContext.Provider value={{page,handleClick,setPage}}>
            {children}
        </MenuActivoContext.Provider>
    )
}

export default MenuActivoProvider
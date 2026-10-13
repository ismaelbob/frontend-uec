import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import './styles/usuario.css'
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import BtnaddModal from '../components/BtnaddModal'
import BtnToggleInactivos from '../components/BtnToggleInactivos'
import ProcessingOverlay from '../components/ProcessingOverlay'
import ModalEditarSite from '../components/ModalEditarSite'
import ModalEditarLeader from '../components/ModalEditarLeader'
import ModalEditarMeeting from '../components/ModalEditarMeeting'
import ModalEditarCarousel from '../components/ModalEditarCarousel'
import ModalEliminarItem from '../components/ModalEliminarItem'
import LeaderItem from '../components/home_admin/LeaderItem'
import LeaderItemInactivo from '../components/home_admin/LeaderItemInactivo'
import MeetingItem from '../components/home_admin/MeetingItem'
import MeetingItemInactivo from '../components/home_admin/MeetingItemInactivo'
import CarouselItem from '../components/home_admin/CarouselItem'
import CarouselItemInactivo from '../components/home_admin/CarouselItemInactivo'
import Config from '../config'
import { fetchConAuth } from '../utils/api'
import SesionContext from '../context/sesion'
import MenuActivoContext from '../context/menuactivo'
import TemaContext from '../context/tema'
import HomeContext from '../context/home'

function AdminHome() {
    const history = useHistory()
    const { nombre, nivel, existeSesion } = useContext(SesionContext)
    const { setPage } = useContext(MenuActivoContext)
    const { temaEfectivo } = useContext(TemaContext)
    const { refresh: refreshHome } = useContext(HomeContext)

    const [cargandoSesion, setCargandoSesion] = useState(true)
    const [procesando, setProcesando] = useState(false)

    const [site, setSite] = useState(null)
    const [mostrarModalSite, setMostrarModalSite] = useState(false)
    const [mensajeSite, setMensajeSite] = useState(null)

    const [leaders, setLeaders] = useState([])
    const [inactivosLeaders, setInactivosLeaders] = useState([])
    const [mostrarInactivosLeaders, setMostrarInactivosLeaders] = useState(false)
    const [cargandoLeaders, setCargandoLeaders] = useState(false)
    const [cargandoInactivosLeaders, setCargandoInactivosLeaders] = useState(false)
    const [mostrarModalLeader, setMostrarModalLeader] = useState(false)
    const [leaderEditando, setLeaderEditando] = useState(null)
    const [mensajeLeader, setMensajeLeader] = useState(null)
    const [leaderEliminando, setLeaderEliminando] = useState(null)

    const [meetings, setMeetings] = useState([])
    const [inactivosMeetings, setInactivosMeetings] = useState([])
    const [mostrarInactivosMeetings, setMostrarInactivosMeetings] = useState(false)
    const [cargandoMeetings, setCargandoMeetings] = useState(false)
    const [cargandoInactivosMeetings, setCargandoInactivosMeetings] = useState(false)
    const [mostrarModalMeeting, setMostrarModalMeeting] = useState(false)
    const [meetingEditando, setMeetingEditando] = useState(null)
    const [mensajeMeeting, setMensajeMeeting] = useState(null)
    const [meetingEliminando, setMeetingEliminando] = useState(null)

    const [carousel, setCarousel] = useState([])
    const [inactivosCarousel, setInactivosCarousel] = useState([])
    const [mostrarInactivosCarousel, setMostrarInactivosCarousel] = useState(false)
    const [cargandoCarousel, setCargandoCarousel] = useState(false)
    const [cargandoInactivosCarousel, setCargandoInactivosCarousel] = useState(false)
    const [mostrarModalCarousel, setMostrarModalCarousel] = useState(false)
    const [carouselEditando, setCarouselEditando] = useState(null)
    const [mensajeCarousel, setMensajeCarousel] = useState(null)
    const [carouselEliminando, setCarouselEliminando] = useState(null)

    useEffect(() => {
        localStorage.setItem('pagina', '4')
        setPage('4')
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (accessToken && refreshToken) {
            setCargandoSesion(true)
            existeSesion().finally(() => setCargandoSesion(false))
        } else {
            setCargandoSesion(false)
        }
    }, [existeSesion, setPage])

    useEffect(() => {
        if (cargandoSesion) return
        if (!nombre || nivel !== 1) {
            history.replace('/')
            return
        }
        // cargar datos
        cargarSite()
        cargarLeadersActivos()
        cargarMeetingsActivos()
        cargarCarouselActivos()
        // eslint-disable-next-line
    }, [cargandoSesion, nombre, nivel, history])

    const cargarSite = async () => {
        try {
            const res = await fetch(`${Config.urlapi}api/site`)
            const data = await res.json()
            if (data.ok) setSite(data.site)
        } catch (e) { console.error(e) }
    }

    const cargarLeadersActivos = async () => {
        setCargandoLeaders(true)
        try {
            const res = await fetch(`${Config.urlapi}api/leaders`)
            const data = await res.json()
            if (data.ok) setLeaders(data.leaders || [])
        } catch (e) { console.error(e) }
        setCargandoLeaders(false)
    }

    const cargarLeadersInactivos = async () => {
        setCargandoInactivosLeaders(true)
        try {
            const res = await fetchConAuth(`${Config.urlapi}api/leaders/admin/inactivos`)
            const data = await res.json()
            if (data.ok) setInactivosLeaders(data.leaders || [])
        } catch (e) { console.error(e) }
        setCargandoInactivosLeaders(false)
    }

    const toggleInactivosLeaders = () => {
        if (!mostrarInactivosLeaders && inactivosLeaders.length === 0) cargarLeadersInactivos()
        setMostrarInactivosLeaders(!mostrarInactivosLeaders)
    }

    const cargarMeetingsActivos = async () => {
        setCargandoMeetings(true)
        try {
            const res = await fetch(`${Config.urlapi}api/meetings`)
            const data = await res.json()
            if (data.ok) setMeetings(data.meetings || [])
        } catch (e) { console.error(e) }
        setCargandoMeetings(false)
    }

    const cargarMeetingsInactivos = async () => {
        setCargandoInactivosMeetings(true)
        try {
            const res = await fetchConAuth(`${Config.urlapi}api/meetings/admin/inactivos`)
            const data = await res.json()
            if (data.ok) setInactivosMeetings(data.meetings || [])
        } catch (e) { console.error(e) }
        setCargandoInactivosMeetings(false)
    }

    const toggleInactivosMeetings = () => {
        if (!mostrarInactivosMeetings && inactivosMeetings.length === 0) cargarMeetingsInactivos()
        setMostrarInactivosMeetings(!mostrarInactivosMeetings)
    }

    const cargarCarouselActivos = async () => {
        setCargandoCarousel(true)
        try {
            const res = await fetch(`${Config.urlapi}api/carousel`)
            const data = await res.json()
            if (data.ok) setCarousel(data.carousel || [])
        } catch (e) { console.error(e) }
        setCargandoCarousel(false)
    }

    const cargarCarouselInactivos = async () => {
        setCargandoInactivosCarousel(true)
        try {
            const res = await fetchConAuth(`${Config.urlapi}api/carousel/admin/inactivos`)
            const data = await res.json()
            if (data.ok) setInactivosCarousel(data.carousel || [])
        } catch (e) { console.error(e) }
        setCargandoInactivosCarousel(false)
    }

    const toggleInactivosCarousel = () => {
        if (!mostrarInactivosCarousel && inactivosCarousel.length === 0) cargarCarouselInactivos()
        setMostrarInactivosCarousel(!mostrarInactivosCarousel)
    }

    const handleGuardarSite = useCallback(async (payload) => {
        setProcesando(true)
        setMensajeSite(null)
        try {
            const res = await fetchConAuth(`${Config.urlapi}api/site`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
            const data = await res.json()
            setMensajeSite(data)
            if (data.ok) {
                await cargarSite()
                if (refreshHome) refreshHome()
                setTimeout(() => { setMostrarModalSite(false); setMensajeSite(null) }, 1500)
            }
        } catch (e) { setMensajeSite({ ok: false, message: 'Error de conexión' }) }
        setProcesando(false)
    }, [refreshHome])

    const handleCrearLeader = () => { setMensajeLeader(null); setLeaderEditando(null); setMostrarModalLeader(true) }
    const handleEditarLeader = (l) => { setMensajeLeader(null); setLeaderEditando(l); setMostrarModalLeader(true) }
    const handleGuardarLeader = useCallback(async (payload) => {
        setProcesando(true)
        setMensajeLeader(null)
        try {
            if (leaderEditando) {
                const res = await fetchConAuth(`${Config.urlapi}api/leaders/${leaderEditando._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                const data = await res.json(); setMensajeLeader(data)
                if (data.ok) { await cargarLeadersActivos(); await cargarLeadersInactivos(); if (refreshHome) refreshHome(); setTimeout(() => { setMostrarModalLeader(false); setMensajeLeader(null) }, 1500) }
            } else {
                const res = await fetchConAuth(`${Config.urlapi}api/leaders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                const data = await res.json(); setMensajeLeader(data)
                if (data.ok) { await cargarLeadersActivos(); if (refreshHome) refreshHome(); setTimeout(() => { setMostrarModalLeader(false); setMensajeLeader(null) }, 1500) }
            }
        } catch (e) { setMensajeLeader({ ok: false, message: 'Error de conexión' }) }
        setProcesando(false)
    }, [leaderEditando, refreshHome])

    const handleEliminarLeader = (l) => setLeaderEliminando(l)
    const confirmarEliminarLeader = useCallback(async () => {
        if (!leaderEliminando) return
        setProcesando(true)
        try {
            const res = await fetchConAuth(`${Config.urlapi}api/leaders/${leaderEliminando._id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.ok) { await cargarLeadersActivos(); await cargarLeadersInactivos(); if (refreshHome) refreshHome() }
            setLeaderEliminando(null)
        } catch (e) { console.error(e) }
        setProcesando(false)
    }, [leaderEliminando, refreshHome])

    const restaurarLeader = useCallback(async (id) => {
        setProcesando(true)
        try {
            await fetchConAuth(`${Config.urlapi}api/leaders/${id}/restore`, { method: 'PATCH' })
            await cargarLeadersActivos(); await cargarLeadersInactivos(); if (refreshHome) refreshHome()
        } catch (e) { console.error(e) }
        setProcesando(false)
    }, [refreshHome])

    const handleCrearMeeting = () => { setMensajeMeeting(null); setMeetingEditando(null); setMostrarModalMeeting(true) }
    const handleEditarMeeting = (m) => { setMensajeMeeting(null); setMeetingEditando(m); setMostrarModalMeeting(true) }
    const handleGuardarMeeting = useCallback(async (payload) => {
        setProcesando(true)
        setMensajeMeeting(null)
        try {
            if (meetingEditando) {
                const res = await fetchConAuth(`${Config.urlapi}api/meetings/${meetingEditando._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                const data = await res.json(); setMensajeMeeting(data)
                if (data.ok) { await cargarMeetingsActivos(); await cargarMeetingsInactivos(); if (refreshHome) refreshHome(); setTimeout(() => { setMostrarModalMeeting(false); setMensajeMeeting(null) }, 1500) }
            } else {
                const res = await fetchConAuth(`${Config.urlapi}api/meetings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                const data = await res.json(); setMensajeMeeting(data)
                if (data.ok) { await cargarMeetingsActivos(); if (refreshHome) refreshHome(); setTimeout(() => { setMostrarModalMeeting(false); setMensajeMeeting(null) }, 1500) }
            }
        } catch (e) { setMensajeMeeting({ ok: false, message: 'Error de conexión' }) }
        setProcesando(false)
    }, [meetingEditando, refreshHome])

    const handleEliminarMeeting = (m) => setMeetingEliminando(m)
    const confirmarEliminarMeeting = useCallback(async () => {
        if (!meetingEliminando) return
        setProcesando(true)
        try {
            const res = await fetchConAuth(`${Config.urlapi}api/meetings/${meetingEliminando._id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.ok) { await cargarMeetingsActivos(); await cargarMeetingsInactivos(); if (refreshHome) refreshHome() }
            setMeetingEliminando(null)
        } catch (e) { console.error(e) }
        setProcesando(false)
    }, [meetingEliminando, refreshHome])

    const restaurarMeeting = useCallback(async (id) => {
        setProcesando(true)
        try {
            await fetchConAuth(`${Config.urlapi}api/meetings/${id}/restore`, { method: 'PATCH' })
            await cargarMeetingsActivos(); await cargarMeetingsInactivos(); if (refreshHome) refreshHome()
        } catch (e) { console.error(e) }
        setProcesando(false)
    }, [refreshHome])

    const handleCrearCarousel = () => { setMensajeCarousel(null); setCarouselEditando(null); setMostrarModalCarousel(true) }
    const handleEditarCarousel = (c) => { setMensajeCarousel(null); setCarouselEditando(c); setMostrarModalCarousel(true) }
    const handleGuardarCarousel = useCallback(async (payload) => {
        setProcesando(true)
        setMensajeCarousel(null)
        try {
            if (carouselEditando) {
                const res = await fetchConAuth(`${Config.urlapi}api/carousel/${carouselEditando._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                const data = await res.json(); setMensajeCarousel(data)
                if (data.ok) { await cargarCarouselActivos(); await cargarCarouselInactivos(); if (refreshHome) refreshHome(); setTimeout(() => { setMostrarModalCarousel(false); setMensajeCarousel(null) }, 1500) }
            } else {
                const res = await fetchConAuth(`${Config.urlapi}api/carousel`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                const data = await res.json(); setMensajeCarousel(data)
                if (data.ok) { await cargarCarouselActivos(); if (refreshHome) refreshHome(); setTimeout(() => { setMostrarModalCarousel(false); setMensajeCarousel(null) }, 1500) }
            }
        } catch (e) { setMensajeCarousel({ ok: false, message: 'Error de conexión' }) }
        setProcesando(false)
    }, [carouselEditando, refreshHome])

    const handleEliminarCarousel = (c) => setCarouselEliminando(c)
    const confirmarEliminarCarousel = useCallback(async () => {
        if (!carouselEliminando) return
        setProcesando(true)
        try {
            const res = await fetchConAuth(`${Config.urlapi}api/carousel/${carouselEliminando._id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.ok) { await cargarCarouselActivos(); await cargarCarouselInactivos(); if (refreshHome) refreshHome() }
            setCarouselEliminando(null)
        } catch (e) { console.error(e) }
        setProcesando(false)
    }, [carouselEliminando, refreshHome])

    const restaurarCarousel = useCallback(async (id) => {
        setProcesando(true)
        try {
            await fetchConAuth(`${Config.urlapi}api/carousel/${id}/restore`, { method: 'PATCH' })
            await cargarCarouselActivos(); await cargarCarouselInactivos(); if (refreshHome) refreshHome()
        } catch (e) { console.error(e) }
        setProcesando(false)
    }, [refreshHome])

    if (cargandoSesion) return (<div className="container d-flex justify-content-center mt-2"><Loader /></div>)

    if (!nombre || nivel !== 1) return null

    const textColor = temaEfectivo === 'dark' ? '#E0E0E0' : '#000000'

    return (
        <>
            <div className="container mt-3">
                <div>
                    <div className="barra_menu">
                        <h4 style={{ color: textColor, paddingTop: '0.5rem' }}>Administrar Página de Inicio</h4>
                    </div>

                    <div className="mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 style={{ color: textColor }}>Configuración del Sitio</h5>
                            <button className="btn btn-primary btn-sm" onClick={() => { setMensajeSite(null); setMostrarModalSite(true) }}>Editar Configuración</button>
                        </div>
                        {site ? (
                            <div className="p-3" style={{ backgroundColor: temaEfectivo === 'dark' ? 'var(--card-bg)' : '#f8f9fa', borderRadius: '8px', color: textColor }}>
                                <div><strong>Iglesia:</strong> {site.iglesia || '-'}</div>
                                <div><strong>Lema:</strong> {site.lema || '-'}</div>
                                <div><strong>Ciudad:</strong> {site.ciudad || '-'} - {site.pais || '-'}</div>
                                <div><strong>Dirección:</strong> {site.direccion || '-'}</div>
                                <div><strong>Teléfono:</strong> {site.telefono || '-'}</div>
                                <div><strong>Email:</strong> {site.email || '-'}</div>
                                <div><strong>Año Fundación/Actual:</strong> {site.anioFundacion || '-'} / {site.anioactual || '-'}</div>
                                <div><strong>Redes:</strong> {site.redes && site.redes.length > 0 ? site.redes.map(r => r.nombre).join(', ') : '-'}</div>
                            </div>
                        ) : <Loader />}
                    </div>

                    <div className="mt-5">
                        <div className="barra_menu">
                            <h5 style={{ color: textColor, paddingTop: '0.5rem' }}>Líderes</h5>
                            <div className="barra_menu-buttom">
                                <BtnToggleInactivos count={inactivosLeaders.length} onClick={toggleInactivosLeaders} expanded={mostrarInactivosLeaders} />
                                <BtnaddModal onClick={handleCrearLeader} />
                            </div>
                        </div>
                        {cargandoLeaders ? <Loader /> : leaders.map((l, idx) => (<LeaderItem key={l._id} leader={l} indice={idx + 1} onEditar={handleEditarLeader} onEliminar={handleEliminarLeader} />))}
                        {mostrarInactivosLeaders && (<div className="mt-4"><h6 style={{ color: textColor }}>Líderes Inactivos</h6>{cargandoInactivosLeaders ? <Loader /> : inactivosLeaders.map((l, idx) => (<LeaderItemInactivo key={l._id} leader={l} indice={idx + 1} onRestaurar={restaurarLeader} />))}</div>)}
                    </div>

                    <div className="mt-5">
                        <div className="barra_menu">
                            <h5 style={{ color: textColor, paddingTop: '0.5rem' }}>Reuniones</h5>
                            <div className="barra_menu-buttom">
                                <BtnToggleInactivos count={inactivosMeetings.length} onClick={toggleInactivosMeetings} expanded={mostrarInactivosMeetings} />
                                <BtnaddModal onClick={handleCrearMeeting} />
                            </div>
                        </div>
                        {cargandoMeetings ? <Loader /> : meetings.map((m, idx) => (<MeetingItem key={m._id} meeting={m} indice={idx + 1} onEditar={handleEditarMeeting} onEliminar={handleEliminarMeeting} />))}
                        {mostrarInactivosMeetings && (<div className="mt-4"><h6 style={{ color: textColor }}>Reuniones Inactivas</h6>{cargandoInactivosMeetings ? <Loader /> : inactivosMeetings.map((m, idx) => (<MeetingItemInactivo key={m._id} meeting={m} indice={idx + 1} onRestaurar={restaurarMeeting} />))}</div>)}
                    </div>

                    <div className="mt-5 mb-4">
                        <div className="barra_menu">
                            <h5 style={{ color: textColor, paddingTop: '0.5rem' }}>Carrusel</h5>
                            <div className="barra_menu-buttom">
                                <BtnToggleInactivos count={inactivosCarousel.length} onClick={toggleInactivosCarousel} expanded={mostrarInactivosCarousel} />
                                <BtnaddModal onClick={handleCrearCarousel} />
                            </div>
                        </div>
                        {cargandoCarousel ? <Loader /> : carousel.map((c, idx) => (<CarouselItem key={c._id} item={c} indice={idx + 1} onEditar={handleEditarCarousel} onEliminar={handleEliminarCarousel} />))}
                        {mostrarInactivosCarousel && (<div className="mt-4"><h6 style={{ color: textColor }}>Imágenes Inactivas</h6>{cargandoInactivosCarousel ? <Loader /> : inactivosCarousel.map((c, idx) => (<CarouselItemInactivo key={c._id} item={c} indice={idx + 1} onRestaurar={restaurarCarousel} />))}</div>)}
                    </div>
                </div>
                <Footer />
            </div>

            <ModalEditarSite show={mostrarModalSite} onClose={() => setMostrarModalSite(false)} onSave={handleGuardarSite} site={site} mensaje={mensajeSite} />
            <ModalEditarLeader show={mostrarModalLeader} onClose={() => setMostrarModalLeader(false)} onSave={handleGuardarLeader} leader={leaderEditando} mensaje={mensajeLeader} />
            <ModalEliminarItem show={leaderEliminando !== null} onClose={() => setLeaderEliminando(null)} onConfirm={confirmarEliminarLeader} item={leaderEliminando} tipo="líder" procesando={procesando} />
            <ModalEditarMeeting show={mostrarModalMeeting} onClose={() => setMostrarModalMeeting(false)} onSave={handleGuardarMeeting} meeting={meetingEditando} mensaje={mensajeMeeting} />
            <ModalEliminarItem show={meetingEliminando !== null} onClose={() => setMeetingEliminando(null)} onConfirm={confirmarEliminarMeeting} item={meetingEliminando} tipo="reunión" procesando={procesando} />
            <ModalEditarCarousel show={mostrarModalCarousel} onClose={() => setMostrarModalCarousel(false)} onSave={handleGuardarCarousel} item={carouselEditando} mensaje={mensajeCarousel} />
            <ModalEliminarItem show={carouselEliminando !== null} onClose={() => setCarouselEliminando(null)} onConfirm={confirmarEliminarCarousel} item={carouselEliminando} tipo="imagen" procesando={procesando} />
            <ProcessingOverlay show={procesando} />
        </>
    )
}
export default AdminHome

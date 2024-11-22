import {FC, useContext, useEffect, useState} from 'react'

import {toAbsoluteUrl} from './utilidad/AssetHelpers'
import {funcionesGenerales} from "@utilidad/funcionesGenerales";
import {RestauranteInterface} from '@/interfaces/RestauranteInterface'
import {MaestrosInterface} from "@interfaces/MaestrosInterface";
import FiltroRestauranteComponente from "@componentes/FiltroResturante";
import Login from "@componentes/login";
import {useAuth} from '@context/authContext';
import RegistroUsuario from "@componentes/RegistroUsuario";
import DetalleRestaurante from "@componentes/verResturante";
import InteraccionesUsuarioComponente from "@componentes/interaccionesUsuarioComponete";
import {Star} from 'lucide-react';

function App() {
    const [restaurantes, setRestaurantes] = useState<RestauranteInterface[]>([]);
    const [detalleRestaurante, setDetalleRestaurante] = useState<RestauranteInterface>();
    const [maestros, setMaestros] = useState<MaestrosInterface[]>([]);
    const [mostrarCargando, setMostrarCargando] = useState(false);
    const [modalInicioSesion, setModalInicioSesion] = useState(false);
    const [modalVerRestaunte, setModalVerRestaunte] = useState(false);
    let {checkAuth, user, logout} = useAuth();
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleShowModal = () => setShowRegisterModal(true);
    const handleCloseModal = () => setShowRegisterModal(false);
    const handleShow = () => setModalInicioSesion(true);
    const handleClose = () => setModalInicioSesion(false);
    const modalVerRestaurante = () => setModalVerRestaunte(true);
    const modalCerrar = () => setModalVerRestaunte(false);
    const consultarRestaurantes = async (buscar: string, categoria: string, ubicacion: string) => {
        try {
            setMostrarCargando(true);
            const datos = await funcionesGenerales.peticionJson(`/restaurantes?buscar=${buscar}&categoria=${categoria}&ubicacion=${ubicacion}`, "GET", null);
            console.log("consultarRestaurantes");
            setMostrarCargando(false);
            setRestaurantes(datos.data);
            await checkAuth();
        } catch (err) {
            //setError(err);
        }
    };
    const consultarDetalleRestaurante = async (id: string) => {
        try {
            setMostrarCargando(true);
            setModalVerRestaunte(true);
            const datos = await funcionesGenerales.peticionJson(`/restaurantes/${id}`, "GET", null);
            console.log("detalle restaurante");
            setMostrarCargando(false);
            setDetalleRestaurante(datos.data);
        } catch (err) {
            //setError(err);
        }
    };
    useEffect(() => {
        const consultarMaestros = async () => {
            try {
                setMostrarCargando(true);
                const datos = await funcionesGenerales.peticionJson("/maestros", "GET", null);
                setMostrarCargando(false);
                setMaestros(datos.data);
                console.log("maestros");
            } catch (err) {
                //setError(err);
            }
        };
        consultarRestaurantes('', '', '');
        consultarMaestros();
    }, []);
    return (
        <>
            <div id="cargando" className="preloader hide">
                <div className="preloader-inner">
                    <div className="preloader-icon">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <header className="header navbar-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="nav-inner">
                                <nav className="navbar navbar-expand-lg">
                                    <a className="navbar-brand" href="index.html">
                                        <img src={toAbsoluteUrl('/assets/images/logo/logo.svg')} alt="Logo"/>
                                    </a>
                                    <button
                                        className="navbar-toggler mobile-menu-btn"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="toggler-icon"></span>
                                        <span className="toggler-icon"></span>
                                        <span className="toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                        <ul id="nav" className="navbar-nav ms-auto">
                                        </ul>
                                    </div>
                                    <div className="login-button">
                                        <ul>

                                            <Login show={modalInicioSesion} handleClose={handleClose}></Login>
                                            {
                                                user == null ? (
                                                    <>
                                                        <li>
                                                            <button className="btn btn-light" onClick={handleShow}><i
                                                                className="lni lni-enter"></i> Ingresar
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="btn btn-light" onClick={handleShowModal}>
                                                                <i className="lni lni-user"></i> Registrarme
                                                            </button>
                                                            <RegistroUsuario
                                                                show={showRegisterModal}
                                                                onHide={handleCloseModal}></RegistroUsuario>

                                                        </li>
                                                    </>
                                                ) : (
                                                    <li>
                                                        <button className="btn btn-light" onClick={logout}>
                                                            <i className="lni lni-exit"></i> Cerrar Sesión
                                                        </button>
                                                    </li>
                                                )
                                            }

                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Start Hero Area */}
            <section className="hero-area overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 col-md-12 col-12">
                            <div className="hero-text text-center">
                                <div className="section-heading">
                                    <h2 className="wow fadeInUp" data-wow-delay=".3s">Bienvenido a tus restaurantes de
                                        la costa</h2>
                                    <p className="wow fadeInUp" data-wow-delay=".5s">
                                        Buy And Sell Everything From Used Cars To Mobile Phones And
                                        <br/>Computers, Or Search For Property, Jobs And More.
                                    </p>
                                </div>
                                {
                                    maestros.length > 0 && (
                                        <FiltroRestauranteComponente onBuscarResturantes={consultarRestaurantes}
                                                                     ubicaciones={maestros[0].ubicaciones}
                                                                     categorias={maestros[0].categorias}/>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="items-grid section p-0">
                <div className="container">
                    <div className="single-head">
                        <div className="row">
                            <DetalleRestaurante mostrar={modalVerRestaunte} cerrar={modalCerrar}
                                                datos={detalleRestaurante} usuario={user}></DetalleRestaurante>
                            {restaurantes.map((item) => (
                                <div className="col-lg-4 col-md-6 col-12">

                                    <div className="single-grid wow fadeInUp" data-wow-delay=".4s">
                                        <div className="image">
                                            <span onClick={() => consultarDetalleRestaurante(item.id)}
                                                  className="thumbnail"><img
                                                src="assets/images/items-grid/img2.jpg" alt="#"></img></span>
                                            <div className="author">
                                                {/*<div className="author-image">
                                                    <a href="javascript:void(0)"><img
                                                        src="assets/images/items-grid/author-2.jpg" alt="#"></img>
                                                        <span>Alex Jui</span></a>
                                                </div>*/}
                                                <p className="sale">Reservar</p>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <div className="top-content">
                                                <a href="javascript:void(0)" className="tag">{item.categoria}</a>
                                                <h3 className="title">
                                                    <a href="item-details.html">{item.nombre}</a>
                                                </h3>
                                                {/*<p className="update-time">Last Updated: 2 hours ago</p>*/}
                                                <div className="d-flex justify-content-center">
                                                    <div className="flex gap-1 mb-1 rating">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-5 h-5 ${
                                                                    i < (item.estadisticas.length > 0 ? item.estadisticas[0].promedioCalificacion : 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                                }`}
                                                            />
                                                        ))}
                                                        {(item.estadisticas.length > 0 ? item.estadisticas[0].promedioCalificacion : 0) > 0 && (
                                                            <span className="ml-2 text-gray-600">
          {(item.estadisticas.length > 0 ? item.estadisticas[0].promedioCalificacion : 0)} / 5
        </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <ul className="info-list">
                                                    <li><a href="javascript:void(0)"><i
                                                        className="lni lni-map-marker"></i>{item.ubicacion.ciudad}</a>
                                                    </li>
                                                    <li><a href="javascript:void(0)"><i
                                                        className="lni lni-timer"></i>Abierto</a></li>
                                                </ul>
                                            </div>
                                            <div className="bottom-content">
                                                <InteraccionesUsuarioComponente
                                                    idRestaurante={item.id}
                                                    esResena={false}
                                                    idResena={0}
                                                    totalMeGusta={item.totalMeGusta}
                                                    totalNoMeGusta={item.totalNoMeGusta}
                                                    paramMeGusta={item.meGusta}
                                                    paramNoMeGusta={item.noMeGusta}
                                                ></InteraccionesUsuarioComponente>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default App;


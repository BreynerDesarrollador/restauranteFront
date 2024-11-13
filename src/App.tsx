import {FC, useContext, useEffect, useState} from 'react'

import './App.css'

import './assets/css/bootstrap.min.css';
import './assets/css/LineIcons.2.0.css';
import './assets/css/animate.css';
import './assets/css/tiny-slider.css';
import './assets/css/glightbox.min.css';
import './assets/css/main.css';
import {toAbsoluteUrl} from './utilidad/AssetHelpers'
import {funcionesGenerales} from "@utilidad/funcionesGenerales";
import {RestauranteInterface} from '@/interfaces/RestauranteInterface'
import {MaestrosInterface} from "@interfaces/MaestrosInterface";
import FiltroRestauranteComponente from "@componentes/FiltroResturante";
import Login from "@componentes/login";
import {useAuth} from '@context/authContext'

function App() {
    const [restaurantes, setRestaurantes] = useState<RestauranteInterface[]>([]);
    const [maestros, setMaestros] = useState<MaestrosInterface[]>([]);
    const [mostrarCargando, setMostrarCargando] = useState(false);
    const [modalInicioSesion, setModalInicioSesion] = useState(false);
    let {checkAuth, user, logout} = useAuth();
    const handleShow = () => setModalInicioSesion(true);
    const handleClose = () => setModalInicioSesion(false);
    const consultarRestaurantes = async (buscar: string, categoria: string, ubicacion: string) => {
        try {
            setMostrarCargando(true);
            const datos = await funcionesGenerales.peticionJson(`/restaurantes?buscar=${buscar}&categoria=${categoria}&ubicacion=${ubicacion}`, "GET", null);
            console.log(datos);
            setMostrarCargando(false);
            setRestaurantes(datos.data);
            await checkAuth();
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
                setMaestros(datos);
            } catch (err) {
                //setError(err);
            }
        };
        consultarRestaurantes('', '', '');
        consultarMaestros();
    }, []);
    return (
        <>
            {
                mostrarCargando && (
                    <div className="preloader">
                        <div className="preloader-inner">
                            <div className="preloader-icon">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )
            }
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
                                                        <li><a href="#"><i className="lni lni-user"></i> Registrarme</a>
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
                            {restaurantes.map((item) => (
                                <div className="col-lg-4 col-md-6 col-12">

                                    <div className="single-grid wow fadeInUp" data-wow-delay=".4s">
                                        <div className="image">
                                            <a href="item-details.html" className="thumbnail"><img
                                                src="assets/images/items-grid/img2.jpg" alt="#"></img></a>
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
                                                <ul className="rating">
                                                    <li><i className="lni lni-star-filled"></i></li>
                                                    <li><i className="lni lni-star-filled"></i></li>
                                                    <li><i className="lni lni-star-filled"></i></li>
                                                    <li><i className="lni lni-star-filled"></i></li>
                                                    <li><i className="lni lni-star-filled"></i></li>
                                                    <li><a href="javascript:void(0)">(20)</a></li>
                                                </ul>
                                                <ul className="info-list">
                                                    <li><a href="javascript:void(0)"><i
                                                        className="lni lni-map-marker"></i>{item.ubicacion.ciudad}</a>
                                                    </li>
                                                    <li><a href="javascript:void(0)"><i
                                                        className="lni lni-timer"></i>Abierto</a></li>
                                                </ul>
                                            </div>
                                            <div className="bottom-content">
                                                {/*<p className="price">Start From: <span>$450.00</span></p>*/}
                                                <a href="javascript:void(0)" className="like"><i
                                                    className="lni lni-heart"></i></a>
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


import React from 'react';
import {Modal} from 'react-bootstrap';
import {RestauranteInterface} from '@interfaces/RestauranteInterface'
import Resenas from "@componentes/Resenas";
import {Star} from 'lucide-react';

interface RestaurantProps {
    mostrar: boolean;
    cerrar: () => void;
    datos: RestauranteInterface | null | undefined;
    usuario: any | null
}

const DetalleRestaurante: React.FC<RestaurantProps> = ({mostrar, cerrar, datos, usuario}) => {
    if (!datos) return <div>Cargando...</div>;
    return (
        <Modal show={mostrar} onHide={cerrar} size='xl'>
            <Modal.Body>
                <div className="row">
                    {/*<div className="card mb-3">
                        <img src={datos.imagenPrincipal} className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>*/}
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12 form-group">
                        <div className="card mb-3 bg-white rounded-lg shadow">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={datos.imagenPrincipal} className="img-fluid rounded-start"
                                         alt="..."></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <p className="card-title"><h5>{datos.nombre} - <i
                                            className="badge text-bg-primary text-primary">{datos.categoria}</i>
                                        </h5>
                                        </p>
                                        <p className="card-text col-12">{datos.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col">
                            <div className="card bg-white rounded-lg shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Calificaciones y opiniones</h5>
                                    <p className="card-text">
                                        <div className="d-flex justify-content-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${
                                                        i < (datos.estadisticas.length > 0 ? datos.estadisticas[0].promedioCalificacion : 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                            {(datos.estadisticas.length > 0 ? datos.estadisticas[0].promedioCalificacion : 0) > 0 && (
                                                <span className="ml-2 text-gray-600">
          {(datos.estadisticas.length > 0 ? datos.estadisticas[0].promedioCalificacion : 0)} / 5
        </span>
                                            )}
                                            <p>Opiniones: {datos.totalResenas}</p>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-white rounded-lg shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Detalle</h5>
                                    <p className="card-text">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 form-group">
                                                <ul className="space-y-1">
                                                    <li>Delivery: {datos.caracteristicas?.tieneDelivery ? 'Sí' : 'No'}</li>
                                                    <li>Acepta
                                                        tarjeta: {datos.caracteristicas?.aceptaTarjeta ? 'Sí' : 'No'}</li>
                                                    <li>Estacionamiento: {datos.caracteristicas?.tieneEstacionamiento ? 'Sí' : 'No'}</li>
                                                    <li>WiFi: {datos.caracteristicas?.wifi ? 'Sí' : 'No'}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-white rounded-lg shadow">
                                <div className="card-body">
                                    <h5 className="card-title">Ubicación y detalle de contacto</h5>
                                    <p className="card-text">
                                        {datos.ubicacion?.direccion}, {datos.ubicacion?.ciudad}, {datos.ubicacion?.pais}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12 form-group">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Menú</h5>
                                <div className="row">
                                    {datos.menu?.map((item) => (
                                        <div className="col-sm-12 col-md-4 form-group">
                                            <h4 className="font-medium">{item.nombre}</h4>
                                            <p>{item.descripcion}</p>
                                            <p>Precio: ${item.precio.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12 form-group pb-2">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Horario</h5>
                                <div className="row">
                                    {Object.entries(datos.horario || {}).map(([dia, horas]) => (
                                        <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xs-3 form-group">
                                            {dia}: {horas.apertura} - {horas.cierre}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12 form-group pb-2">
                        <Resenas idRestaurante={datos.id} usuario={usuario} datosRestaurante={datos}></Resenas>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
export default DetalleRestaurante;
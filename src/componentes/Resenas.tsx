import React, {useState, useEffect} from 'react';
import {Star, ThumbsUp, ThumbsDown, MessageCircle} from 'lucide-react';
import {Resena} from '@interfaces/ResenaInterface';
import {funcionesGenerales} from "@utilidad/funcionesGenerales";
import {RestauranteInterface} from "@interfaces/RestauranteInterface";
import InteraccionesUsuarioComponente from "@componentes/interaccionesUsuarioComponete";

interface InteraccionesProps {
    idRestaurante: string;
    usuario: any,
    datosRestaurante: RestauranteInterface
}

const Resenas: React.FC<InteraccionesProps> = ({idRestaurante, usuario, datosRestaurante}) => {
    const [datosResena, setResenas] = useState<Resena[]>([]);
    const [nuevaResena, setNuevaResena] = useState({
        calificacion: 5,
        comentario: '',
        imagenes: []
    });
    const [promedioCalificacion, setPromedioCalificacion] = useState(0);
    const [contadorVisitas, setContadorVisitas] = useState(0);

    useEffect(() => {
        fetchReviews();
        incrementarVisitas();
    }, []);

    const fetchReviews = async () => {
        const res = await funcionesGenerales.peticionJson(`/restaurantes/ObtenerResenasRestaurante/${idRestaurante}`, "GET");
        console.log("obtener reseñas");
        if (res.exito) {
            setResenas(res.data.items);
        } else {
            funcionesGenerales.mostrarMensaje("warning", "", res.mensaje);
        }
    };
    const incrementarVisitas = () => {
        setContadorVisitas(prev => prev + 1);
    };

    const guardarResena = async (e: any) => {
        e.preventDefault();
        const reviewToSubmit = {
            ...nuevaResena,
            id: '0',
            fecha: new Date(),
            respuestas: [],
            usuarioId: usuario?.id,
            restauranteId: idRestaurante,
            UsuariosMeGusta: [],
            UsuariosNoMeGusta: [],
            totalNoMeGusta: 0,
            totalMeGusta: 0,
            usuarioHaDadoMeGusta: false,
            usuarioHaDadoNoMeGusta: false
        };
        const datos = await funcionesGenerales.peticionJson(`/resenas/RegistrarResena`, 'POST', reviewToSubmit)
        if (datos?.exito) {
            setResenas([...datosResena, reviewToSubmit]);
            setNuevaResena({calificacion: 5, comentario: '', imagenes: []});
        } else {
            funcionesGenerales.mostrarMensaje("warning", "", datos.mensaje);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold">Reseñas</h3>
                                <div className="text-sm text-gray-600">
                                    <span
                                        className="mr-4">Visitas: {datosRestaurante.estadisticas.length > 0 ? datosRestaurante.estadisticas[0].contadorVisitas : 0}</span>
                                    <span>Calificación promedio: {datosRestaurante.estadisticas.length > 0 ? datosRestaurante.estadisticas[0].promedioCalificacion : 0}</span>
                                </div>
                            </div>

                            <form onSubmit={guardarResena} className="mb-8">
                                <div className="col-sm-12 col-12 form-group pb-1">
                                    <label className="block text-gray-700 mb-2">Calificación</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNuevaResena({
                                                    ...nuevaResena,
                                                    calificacion: star
                                                })}
                                                className="focus:outline-none"
                                            >
                                                <Star
                                                    className={`w-6 h-6 ${
                                                        star <= nuevaResena.calificacion
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 form-group pb-1">
                                    <strong className="block text-gray-700 mb-2">Comentario</strong>
                                    <textarea
                                        className="form-control w-full p-2 border rounded-lg"
                                        value={nuevaResena.comentario}
                                        onChange={(e) => setNuevaResena({...nuevaResena, comentario: e.target.value})}
                                        rows={3}
                                    />
                                </div>
                                <div className="col-sm-12 col-12 form-group text-center pb-1">
                                    <button
                                        type="submit"
                                        className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Publicar reseña
                                    </button>
                                </div>
                            </form>

                            <div className="space-y-4">
                                {datosResena.map((resena, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="flex gap-1 mb-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-5 h-5 ${
                                                                i < resena.calificacion ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(resena.fecha).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-4">
                                                {/*<button className="flex items-center gap-1">
                                                    <ThumbsUp color={resena.usuarioHaDadoMeGusta ? 'blue' : 'gray'} className="w-4 h-4"/>
                                                    <span>{resena.totalMeGusta}</span>
                                                </button>
                                                <button className="flex items-center gap-1">
                                                    <ThumbsDown className="w-4 h-4"/>
                                                    <span>{resena.totalNoMeGusta}</span>
                                                </button>*/}
                                                <InteraccionesUsuarioComponente
                                                    idRestaurante={datosRestaurante.id}
                                                    totalMeGusta={resena.totalMeGusta}
                                                    totalNoMeGusta={resena.totalNoMeGusta}
                                                    esResena={true}
                                                    idResena={resena.id}
                                                    paramMeGusta={resena.usuarioHaDadoMeGusta}
                                                    paramNoMeGusta={resena.usuarioHaDadoNoMeGusta}
                                                ></InteraccionesUsuarioComponente>
                                            </div>
                                        </div>

                                        <p className="mb-4">{resena.comentario}</p>

                                        {resena.respuestas.length > 0 && (
                                            <div className="ml-8 space-y-2">
                                                {resena.respuestas.map((respuesta: any, rIndex: any) => (
                                                    <div key={rIndex} className="bg-gray-50 p-3 rounded">
                                                        <p className="text-sm text-gray-600 mb-1">
                                                            {new Date(respuesta.fecha).toLocaleDateString()}
                                                        </p>
                                                        <p>{respuesta.comentario}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resenas;
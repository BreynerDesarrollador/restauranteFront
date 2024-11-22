import React, {useState, useEffect} from "react";
import {funcionesGenerales} from "@utilidad/funcionesGenerales";
import {RestauranteInterface} from "@interfaces/RestauranteInterface";
import {ThumbsUp, ThumbsDown} from 'lucide-react';

interface InteraccionesProps {
    idRestaurante: string;
    esResena: boolean | false;
    idResena: any | null | undefined;
    totalMeGusta: number | 0 | undefined;
    totalNoMeGusta: number | 0 | undefined;
    paramMeGusta: boolean | false;
    paramNoMeGusta: boolean | false;
}

const InteraccionesUsuarioComponente: React.FC<InteraccionesProps> = ({
                                                                          idRestaurante,
                                                                          esResena,
                                                                          idResena,
                                                                          totalMeGusta,
                                                                          totalNoMeGusta,
                                                                          paramMeGusta,
                                                                          paramNoMeGusta
                                                                      }) => {
    const [contadoMeGusta, SetContadorMeGusta] = useState(totalMeGusta || 0);
    const [contadorNoMeGusta, setContadorNoMeGusta] = useState(totalNoMeGusta || 0);
    const [meGusta, setMeGusta] = useState(paramMeGusta);
    const [noMeGusta, setNoMeGusta] = useState(paramNoMeGusta);

    const gestionMeGusta = async () => {
        const urlMeGusta = esResena ? `/resenas/${idRestaurante}/${idResena}/DarMeGusta` : `/restaurantes/${idRestaurante}/DarMeGusta`;
        const urlNoMeGusta = esResena ? `/resenas/${idRestaurante}/${idResena}/QuitarMeGusta` : `/restaurantes/${idRestaurante}/QuitarMeGusta`;
        if (!meGusta) {
            const res = await funcionesGenerales.peticionJson(urlMeGusta, "POST");
            if (res.exito) {
                SetContadorMeGusta((prev) => prev + 1);
                setMeGusta(true);
                if (noMeGusta) {
                    setContadorNoMeGusta((prev) => prev - 1);
                    setNoMeGusta(false);
                }
            } else {
                funcionesGenerales.mostrarMensaje("warning", "", res.mensaje);
            }
        } else {
            const res = await funcionesGenerales.peticionJson(urlNoMeGusta, "DELETE");
            if (res.exito) {
                SetContadorMeGusta((prev) => prev - 1);
                setMeGusta(false);
            } else {
                funcionesGenerales.mostrarMensaje("warning", "", res.mensaje);
            }
        }
    };

    const gestionNoMeGusta = async () => {
        const urlNoMeGusta = esResena ? `/resenas/${idRestaurante}/${idResena}/DarNoMeGusta` : `/restaurantes/${idRestaurante}/DarNoMeGusta`;
        const urlQuitarNoMeGusta = esResena ? `/resenas/${idRestaurante}/${idResena}/QuitarNoMeGusta` : `/restaurantes/${idRestaurante}/QuitarNoMeGusta`;

        if (!noMeGusta) {
            const res = await funcionesGenerales.peticionJson(urlNoMeGusta, "POST");
            if (res.exito) {
                setContadorNoMeGusta((prev) => prev + 1);
                setNoMeGusta(true);
                if (meGusta) {
                    SetContadorMeGusta((prev) => prev - 1);
                    setMeGusta(false);
                }
            } else {
                funcionesGenerales.mostrarMensaje("warning", "", res.mensaje);
            }
        } else {
            const res = await funcionesGenerales.peticionJson(urlQuitarNoMeGusta, "DELETE");
            if (res.exito) {
                setContadorNoMeGusta((prev) => prev - 1);
                setNoMeGusta(false);
            } else {
                funcionesGenerales.mostrarMensaje("warning", "", res.mensaje);
            }
        }
    };

    useEffect(() => {
        setMeGusta(meGusta);
        setNoMeGusta(noMeGusta);
    }, [meGusta, noMeGusta]);

    return (
        <div className="row mt-5">
            <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                    {/*<div onClick={gestionMeGusta}>
                        <span className="me-3">{contadoMeGusta > 0 ? contadoMeGusta : ""}</span>
                        {meGusta ? <i className="bx bxs-like fs-4"></i> : <i className="bx bx-like fs-4"></i>}
                    </div>

                    <div onClick={gestionNoMeGusta}>
                        <span>{contadorNoMeGusta > 0 ? contadorNoMeGusta : ""}</span>
                        {noMeGusta ? (
                            <i className="bx bxs-like bx-rotate-180 fs-4"></i>
                        ) : (
                            <i className="bx bx-like bx-rotate-180 fs-4"></i>
                        )}
                    </div>*/}
                    <button className="flex items-center gap-1" onClick={gestionMeGusta}>
                        <ThumbsUp color={meGusta ? 'blue' : 'gray'} className="w-4 h-4"/>
                        <span>{contadoMeGusta}</span>
                    </button>
                    <button className="flex items-center gap-1" onClick={gestionNoMeGusta}>
                        <ThumbsDown color={noMeGusta ? 'blue' : 'gray'} className="w-4 h-4"/>
                        <span>{contadorNoMeGusta}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InteraccionesUsuarioComponente;
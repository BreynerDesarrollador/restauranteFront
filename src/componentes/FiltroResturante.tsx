import React from 'react';
import {FC, useContext, useEffect, useState} from 'react'
import {MaestrosInterface} from '@interfaces/MaestrosInterface'


interface FiltroResturanteProps {
    ubicaciones: string[];
    categorias: string[];
    onBuscarResturantes: (buscar: string, categoria: string, ubicacion: string) => void;
}

const FiltroRestauranteComponente: React.FC<FiltroResturanteProps> = ({
                                                                          categorias,
                                                                          ubicaciones,
                                                                          onBuscarResturantes
                                                                      }) => {
    const [buscar, setBuscar] = useState('');
    const [categoria, setCategoria] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const handleBuscarClick = () => {
        console.log("handleBuscarClick");
        onBuscarResturantes(buscar, categoria, ubicacion);
    };
    return (
        <div className="search-form wow fadeInUp" data-wow-delay=".7s">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-12 p-0">
                    <div className="search-input">
                        <label htmlFor="keyword"><i
                            className="lni lni-search-alt theme-color"></i></label>
                        <input type="text" name="keyword" id="keyword"
                               placeholder="Buscar restaurante"
                               value={buscar}
                               onChange={(e) => setBuscar(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-12 p-0">
                    <div className="search-input">
                        <label htmlFor="category"><i
                            className="lni lni-grid-alt theme-color"></i></label>
                        <select name="category" id="category"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}>
                            <option value="" selected>Seleccionar Categorías</option>
                            {categorias.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-12 p-0">
                    <div className="search-input">
                        <label htmlFor="location"><i
                            className="lni lni-map-marker theme-color"></i></label>
                        <select name="location" id="location"
                                value={ubicacion}
                                onChange={(e) => setUbicacion(e.target.value)}>
                            <option value="" selected>Seleccionar Ubicación</option>
                            {
                                ubicaciones?.length>0 && (
                                    ubicaciones.map((item, index) => (
                                        <option value={item}>{item}</option>
                                    ))
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-12 p-0">
                    <div className="search-btn button">
                        <button onClick={handleBuscarClick} className="btn"><i
                            className="lni lni-search-alt"></i> Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FiltroRestauranteComponente;
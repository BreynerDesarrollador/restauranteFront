import React, {FC, useState, FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '@context/authContext';
import {Modal, Button, Form} from 'react-bootstrap';

interface LoginProps {
    show: boolean;
    handleClose: () => void;
}

const Login: React.FC<LoginProps> = ({show, handleClose}) => {
        const [usuario, setUsername] = useState('');
        const [clave, setPassword] = useState('');
        const {login, cargando} = useAuth();
        const navigate = useNavigate();

        const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const success = await login({usuario, clave});
            console.log(success);
            if (success?.id) {
                navigate('/dashboard'); // O la ruta que desees después del login
            }
        };

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="card">
                        <div className="card-body">
                            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                                <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                                    <h5 className="text-center text-3xl font-extrabold text-gray-900">
                                        Iniciar sesión
                                    </h5>
                                    <form className="container-fluid mt-8 space-y-6" onSubmit={onSubmit}>
                                        <div className="row">
                                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12 form-group'>
                                                <strong className="sr-only">
                                                    Usuario
                                                </strong>
                                                <input
                                                    id="username"
                                                    name="username"
                                                    type="text"
                                                    required
                                                    className="form-control appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    placeholder="Usuario"
                                                    value={usuario}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>

                                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12 form-group'>
                                                <strong className="sr-only">
                                                    Contraseña
                                                </strong>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    required
                                                    className="form-control appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    placeholder="Contraseña"
                                                    value={clave}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div
                                                className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xs-12 form-group text-center'>
                                                <button
                                                    type="submit"
                                                    disabled={cargando}
                                                    className="btn btn-primary"
                                                >
                                                    {cargando ? 'Cargando...' : 'Iniciar sesión'}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        );
    }
;

export default Login;
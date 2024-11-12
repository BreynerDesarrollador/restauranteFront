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
        const {login,cargando} = useAuth();
        const navigate = useNavigate();

        const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const success = await login({usuario, clave});
            if (success) {
                navigate('/dashboard'); // O la ruta que desees después del login
            }
        };

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar Sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                                Iniciar sesión
                            </h2>

                            <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="username" className="sr-only">
                                        Usuario
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Usuario"
                                        value={usuario}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Contraseña"
                                        value={clave}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={cargando}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {cargando ? 'Cargando...' : 'Iniciar sesión'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
;

export default Login;
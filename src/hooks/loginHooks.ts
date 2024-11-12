// src/hooks/useLogin.js
import {useState} from 'react';
import axios from 'axios';
import {useAuth} from '@context/authContext';
const baseUrlApp = process.env.API_URL_BACK;
export const useLogin = () => {
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async (usuario: string, clave: string) => {
        setIsLoading(true);
        // setError(null);

        try {
            const response = await axios.post(baseUrlApp+'/Auth/login', {
                usuario,
                clave
            });

            // Actualizar el contexto de autenticación
            await login(response.data);
            return true;
        } catch (error) {
            // setError(error.response?.data?.message || 'Error al iniciar sesión');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {handleLogin, error, isLoading};
};
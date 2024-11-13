import axios from "axios";
import React, {FC, useState, createContext, useContext,} from "react";
import {IRespuesta} from "@interfaces/IRespuesta";
import {funcionesGenerales} from "@utilidad/funcionesGenerales";

interface LoginCredentials {
    usuario: string;
    clave: string;
}

const AuthContext = createContext<{
    user: any;
    cargando: boolean;
    login: (credentials: any) => Promise<any>;
    logout: () => void;
    checkAuth: () => Promise<any | null | undefined>;
} | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState(null);
    const [cargando, setCargando] = useState(false);
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                // Configura el token en los headers de Axios
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Verificar la validez del token con el backend
                const response = await funcionesGenerales.peticionJson('/auth/verify');
                setUser(response.data);
                return user;
            }
        } catch (error) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        } finally {
            setCargando(false);
        }
    };

    const login = async (credentials: LoginCredentials) => {
        setCargando(true);
        const response = await funcionesGenerales.peticionJson('/auth/login', "POST", credentials);
        const {data, mensaje, exito} = response;
        setCargando(false);
        if (exito) {
            localStorage.setItem('token', data?.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data?.token}`;
            setUser(data?.usuario);
            return user;
        } else {
            funcionesGenerales.mostrarMensaje("warning", "", mensaje);
        }

    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const value = {
        user,
        cargando,
        login,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {!cargando && children}
        </AuthContext.Provider>
    )
}
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
export {AuthProvider, useAuth}
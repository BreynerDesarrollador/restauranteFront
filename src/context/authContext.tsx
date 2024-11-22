import axios, {AxiosError, AxiosResponse} from "axios";
import React, {FC, useState, createContext, useContext,} from "react";
import {IRespuesta} from "@interfaces/IRespuesta";
import {funcionesGenerales} from "@utilidad/funcionesGenerales";
import Swal from 'sweetalert2';

const APP_AUTH_LOCAL_STORAGE_KEY = (typeof process.env.APP_AUTH_LOCAL_STORAGE_KEY !== "undefined") ? process.env.APP_AUTH_LOCAL_STORAGE_KEY : "";

interface LoginCredentials {
    usuario: string;
    clave: string;
}

interface datosRegistro {
    usuario: string;
    clave: string;
    rol: string;
    nombre: string;
    celular: string;
    correo: string;
}

const AuthContext = createContext<{
    usuario: any | undefined;
    cargando: boolean;
    registrar: (data: datosRegistro) => Promise<any>;
    login: (credentials: any) => Promise<any>;
    logout: () => void;
    checkAuth: () => Promise<any | null | undefined>;
} | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(false);
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem(APP_AUTH_LOCAL_STORAGE_KEY);
            if (token) {
                // Configura el token en los headers de Axios
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Verificar la validez del token con el backend
                const response = await funcionesGenerales.peticionJson('/auth/verify');
                setUsuario(response.data);
                return usuario;
            }
        } catch (error) {
            eliminarSesion();
        } finally {
            setCargando(false);
        }
    };
    const eliminarSesion = () => {
        localStorage.removeItem(APP_AUTH_LOCAL_STORAGE_KEY);
        delete axios.defaults.headers.common['Authorization'];
    };
    const registrar = async (datosRegistro: datosRegistro) => {
        setCargando(true);
        try {
            const response = await funcionesGenerales.peticionJson(
                '/auth/register',
                "POST",
                datosRegistro
            );
            const {data, mensaje, exito} = response;

            if (exito) {
                funcionesGenerales.mostrarMensaje(
                    "success",
                    "Registro exitoso",
                    "Tu cuenta ha sido creada correctamente"
                );
                // Opcionalmente, puedes hacer login automático después del registro
                return await login({
                    usuario: datosRegistro.usuario,
                    clave: datosRegistro.clave
                });
            } else {
                funcionesGenerales.mostrarMensaje("warning", "", mensaje);
                return null;
            }
        } catch (error) {
            funcionesGenerales.mostrarMensaje(
                "error",
                "Error",
                "Ocurrió un error durante el registro"
            );
            return null;
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
            localStorage.setItem(APP_AUTH_LOCAL_STORAGE_KEY, data?.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data?.token}`;
            setUsuario(data?.usuario);
            return usuario;
        } else {
            funcionesGenerales.mostrarMensaje("warning", "", mensaje);
        }

    };

    const logout = () => {
        eliminarSesion();
        setUsuario(null);
    };
    const value = {
        usuario,
        cargando,
        registrar,
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
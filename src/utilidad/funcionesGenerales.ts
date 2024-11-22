import axios, {AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios';
import Swal from 'sweetalert2'
import {IRespuesta} from "@interfaces/IRespuesta";

const baseUrlApp = process.env.API_URL_BACK;
const APP_AUTH_LOCAL_STORAGE_KEY = (typeof process.env.APP_AUTH_LOCAL_STORAGE_KEY !== "undefined") ? process.env.APP_AUTH_LOCAL_STORAGE_KEY : "";
export const funcionesGenerales = {
    async peticionJson(
        url: string,
        metodo: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
        datos: any = null,
        encabezados: Record<string, string> = {}
    ): Promise<any> {
        try {
            const config: AxiosRequestConfig = {
                method: metodo,
                url: baseUrlApp + url,
                data: datos,
                headers: {
                    'Content-Type': 'application/json',
                    ...encabezados, // Fusiona encabezados personalizados con los predeterminados
                },
            };

            const respuesta = await axios(config);
            console.log(respuesta);
            return respuesta.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                // Si el error tiene una respuesta, obtenemos el estado y los datos del error
                if (axiosError.response) {
                    // Si la respuesta del servidor es un error HTTP (código 4xx o 5xx)
                    return axiosError.response.data
                } else {
                    // Si no hay respuesta (posiblemente un error de red)
                    return {
                        status: 500,
                        message: 'Error de red o servidor no disponible',
                    };
                }
            } else {
                // Si el error no es de Axios, lo lanzamos como error genérico
                return {
                    status: 500,
                    message: /*error?.message || */'Error desconocido',
                };
            }
        }
    },
    // Función para mostrar mensajes con Swal
    mostrarMensaje(
        tipo: 'success' | 'error' | 'warning' | 'info',
        titulo: string,
        mensaje: string,
        confirmButtonText: string = 'Aceptar',
        timer: number = 0 // El tiempo que durará la alerta (en milisegundos). 0 significa que no se cierra automáticamente.
    ): void {
        Swal.fire({
            icon: tipo,             // Tipo de alerta ('success', 'error', 'warning', 'info')
            title: titulo,          // Título de la alerta
            text: mensaje,          // Mensaje que se muestra
            confirmButtonText,      // Texto del botón de confirmación
            timer,                  // Tiempo de espera para cerrar la alerta (opcional)
        });
    },
    mostrarCargando() {
        const loadingBackdrop = document.getElementById('cargando');
        if (loadingBackdrop) {
            loadingBackdrop.classList.add("loading-backdrop", "fade", "show");
        }
    },
    ocultarCargando() {
        const loadingBackdrop = document.getElementById('cargando')
        if (loadingBackdrop) {
            loadingBackdrop.classList.remove("loading-backdrop", "fade", "show");
            loadingBackdrop.classList.add("hide");
        }
    },
    obtenerToken() {
        const token = localStorage.getItem(APP_AUTH_LOCAL_STORAGE_KEY);
        if (token) {
            return token;
        }
        return false;
    },
    eliminarSesion() {
        localStorage.removeItem(APP_AUTH_LOCAL_STORAGE_KEY);
        delete axios.defaults.headers.common['Authorization'];
    },
    configAxios(axios: any) {
        const $e = this;
        axios.defaults.headers.Accept = 'application/json'

        axios.interceptors.request.use(
            (config: { headers: { Authorization: string } }) => {
                const token = this.obtenerToken();
                this.mostrarCargando()

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }

                return config
            },
            (error: AxiosError) => Promise.reject(error)
        )

        axios.interceptors.response.use(
            function (response: AxiosResponse) {
                $e.ocultarCargando()
                if (response.status === 401) {
                    $e.eliminarSesion()
                }
                return response
            },
            function (error: AxiosError) {
                $e.ocultarCargando();

                if (error.message === "Network Error" && error.isAxiosError) {
                    $e.mostrarMensaje('error', "Error de red, para continuar conéctese a internet", "");
                    return Promise.reject({
                        exito: false,
                        mensaje: "Error de red, para continuar conéctese a internet"
                    } as IRespuesta<any>)
                } else {
                    if (error && error.response && error.response.status === 403) {
                        $e.mostrarMensaje('error', 'No tiene permisos para esta acción', "");
                    } else if (error && error.response && error.response.status === 401) {
                        Swal.fire({
                            confirmButtonText: 'Aceptar',
                            icon: 'info',
                            text: 'Su sesión a expirado!',
                            title: 'Sesión vencida',
                        }).then((result: any) => {
                            $e.eliminarSesion();
                            window.location.href = "/"
                        });
                    }
                    return Promise.reject(error)
                }
            }
        )
    }
};
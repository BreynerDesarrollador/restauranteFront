import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import Swal from 'sweetalert2'

const baseUrlApp = process.env.API_URL_BACK;
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
};
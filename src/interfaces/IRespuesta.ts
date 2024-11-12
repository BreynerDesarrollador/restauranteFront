export interface IRespuesta<T> {
    exito: boolean,
    mensaje: string,
    data: T
}
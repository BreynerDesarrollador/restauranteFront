export interface Resena {
    id: string;
    restauranteId: string;
    usuarioId: string;
    calificacion: number;
    comentario: string;
    // imagenes: string[];
    UsuariosMeGusta: string[] | [];
    UsuariosNoMeGusta: string[] | [];
    respuestas: Respuesta[];
    fecha: Date;
    totalMeGusta: number | undefined;
    totalNoMeGusta: number | undefined;
    usuarioHaDadoMeGusta: boolean | false;
    usuarioHaDadoNoMeGusta: boolean | false;
}

export interface Respuesta {
    usuarioId: string;
    comentario: string;
    fecha: Date;
    UsuariosMeGusta: string[];
    UsuariosNoMeGusta: string[];
}

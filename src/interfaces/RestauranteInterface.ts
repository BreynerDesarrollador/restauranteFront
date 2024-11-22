// src/models/restaurante.ts

export interface MenuItem {
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    disponible: boolean;
    ingredientes: string[];
    imagen: string;
}

export interface Ubicacion {
    direccion: string;
    ciudad: string;
    pais: string;
    coordenadas: {
        latitud: number;
        longitud: number;
    };
}

export interface RestauranteInterface {
    id: string; // Asegúrate de que este campo exista en la respuesta
    nombre: string;
    descripcion: string;
    categoria: string;
    horario: {
        [key: string]: {
            apertura: string;
            cierre: string;
        };
    };
    ubicacion: Ubicacion;
    menu: MenuItem[];
    imagenPrincipal: string;
    imagenes: string[];
    caracteristicas: {
        tieneDelivery: boolean;
        aceptaTarjeta: boolean;
        tieneEstacionamiento: boolean;
        wifi: boolean;
    };
    meGusta: boolean | false;
    noMeGusta: boolean | false;
    totalMeGusta: number | 0;
    totalNoMeGusta: number | 0;
    totalResenas: number | 0
    estadisticas: any | []
}

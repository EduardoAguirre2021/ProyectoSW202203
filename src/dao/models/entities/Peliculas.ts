export interface IPeliculas {
    imagen: string;
    nombre: string;
    titulo: string;
    duracion: number;
    sinopsis: string;
    generos: 'Terror' | 'Comedia' | 'Romance' | 'Misterio';
    rating: 'G' | 'PG' | 'PG-13' | 'R';
    fecha_lanzamiento: Date;
    director: string;
    //actores: string[];
    //puntuaciones: string[]; Rating de Usuarios
    trailer: string; //Link de YT
    status: 'ACT' | 'INA' | 'BLQ';
    //comentarios: string[]; Comentarios de Usuarios
    _id?: unknown;
};
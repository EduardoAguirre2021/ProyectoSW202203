export interface IPeliculas {
    //imagenpeli: arreglo
    nombre: string;
    titulo: string;
    duracion: string;
    sinopsis: string;
    //generos: string[];
    raiting:number;
    fechalanzamiento: Date;
    director: string;
    //actores: string[];
    //puntuacion: calculada
    puntuacionIndividual: string;
    //trailer: link
    //status: string; //'ACT' | 'INA' | 'BLQ'
    comentario: string;
    _id?: unknown;
};
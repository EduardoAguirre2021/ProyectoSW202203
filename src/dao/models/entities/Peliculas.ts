export interface IPeliculas {
  imagen: string;
  titulo: string;
  duracion: string;
  sinopsis: string;
  generos: 'Terror' | 'Comedia' | 'Romance' | 'Misterio';
  rating: 'G' | 'PG' | 'PG-13' | 'R';
  fecha_lanzamiento: Date;
  director: string;
  actores: string;
  puntuaciones: number; // Rating de Usuarios
  trailer: string; // Link de YT
  status: 'ACT' | 'INA' | 'BLQ';
  _id?: unknown;
}

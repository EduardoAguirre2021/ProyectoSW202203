import { getConnection as getMongoDBConn } from '@models/mongodb/MongodbConnection';
import { PeliculaDao as PeliculaDbDao } from '@models/mongodb/PeliculaDao';

export interface IPelicula {
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
}

export class Pelicula {
  private dao: PeliculaDbDao;
  public constructor() {
    const getConnection = getMongoDBConn;
    const PeliculaDao = PeliculaDbDao;
    getConnection()
      .then((conn) => {
        this.dao = new PeliculaDao(conn);
      })
      .catch((ex) => console.error(ex));
  }

  // CONSULTAS DE PELICULAS
  public getAllPeliculas() {
    return this.dao.getPeliculas();
  }

  public addPelicula(pelicula: IPelicula) {
    const {
      imagen,
      titulo,
      duracion,
      sinopsis,
      generos,
      rating,
      fecha_lanzamiento,
      director,
      actores,
      puntuaciones,
      trailer,
      status = 'ACT',
    } = pelicula;

    return this.dao.insertNewPelicula({
      imagen,
      titulo,
      duracion,
      sinopsis,
      generos,
      rating,
      fecha_lanzamiento,
      director,
      actores,
      puntuaciones,
      trailer,
      status,
    });
  }

  public updatePelicula(index: string, pelicula: IPelicula) {
    return (this.dao as PeliculaDbDao).updatePelicula({
      ...pelicula,
      _id: index,
    });
  }

  public deletePelicula(index: string) {
    return this.dao.deletePelicula({ _id: index });
  }
}

import { getConnection as getMongoDBConn } from "@models/mongodb/MongodbConnection";
import { PeliculaDao as PeliculaDbDao } from "@models/mongodb/PeliculaDao";

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

export class Pelicula {
  private dao: PeliculaDbDao;
  public constructor(){
    const getConnection =  getMongoDBConn;
    const PeliculaDao =  PeliculaDbDao;
    getConnection()
      .then(conn=>{
        this.dao = new PeliculaDao(conn);
      })
      .catch(ex=>console.error(ex));
  }

  // CONSULTAS DE PELICULAS
  public getAllPeliculas() {
    return this.dao.getPeliculas()
  }

  public addPelicula( Pelicula:IPeliculas) {
    const { imagen, nombre, titulo, duracion, sinopsis, generos, rating, fecha_lanzamiento, director, trailer, status} = Pelicula;
    return this.dao.insertNewPelicula(
      {
        imagen,
        nombre, 
        titulo, 
        duracion, 
        sinopsis, 
        generos, 
        rating, 
        fecha_lanzamiento, 
        director, 
        trailer, 
        status
      }, 
    );
  }

  public updatePelicula( index:number | string, Pelicula:IPeliculas){
      return (this.dao as PeliculaDbDao).updatePelicula({...Pelicula, _id:index});
  }

  public deletePelicula( index:string) {
      return this.dao.deletePelicula({_id: index})
  }


}
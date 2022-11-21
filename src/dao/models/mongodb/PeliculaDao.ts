import { IPeliculas } from "../entities/Peliculas";
import {Abstract} from "./AbstractDao";
import {Db} from 'mongodb';

export class PeliculaDao extends Abstract<IPeliculas> {
  public constructor(db: Db) {
    super('peliculas', db );
  }
  

  public async deletePelicula( deletePelicula: Partial<IPeliculas>) {
    try {
      const {_id } = deletePelicula;
      const result = await super.delete(_id as string);
      return result;
    } catch( ex: unknown) {
      console.log("PeliculaDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }
}
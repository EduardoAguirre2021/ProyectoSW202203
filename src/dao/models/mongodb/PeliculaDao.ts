import { IPeliculas } from "../entities/Peliculas";
import {Abstract} from "./AbstractDao";
import {Db} from 'mongodb';

export class PeliculaDao extends Abstract<IPeliculas> {
  public constructor(db: Db) {
    super('peliculas', db );
  }

  public getPeliculas() {
    return super.findAll()
  }

  public async insertNewPelicula( newPelicula: IPeliculas) {
    try {
      const {_id, ...newObject} = newPelicula;
      const result = await super.createOne(newObject);
      return result;
    } catch( ex: unknown) {
      console.log("PeliculaDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }
  
  public async updatePelicula( updatePelicula: IPeliculas) {
    try {
      const {_id, ...updateObject} = updatePelicula;
      const result = await super.update(_id as string, updateObject);
      return result;
    } catch( ex: unknown) {
      console.log("PeliculaDao mongodb:", (ex as Error).message);
      throw ex;
    }
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
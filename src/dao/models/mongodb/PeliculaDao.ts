import { IPeliculas } from '../entities/Peliculas';
import { Abstract } from './AbstractDao';
import { Db } from 'mongodb';

export class PeliculaDao extends Abstract<IPeliculas> {
  public constructor(db: Db) {
    super('peliculas', db);
  }

  public getPeliculas() {
    return super.findAll();
  }

  // paginacion para ver las peliculas favoritas por usuario
  public async getMoviesPaged(page: number = 1, itemsPerPage: number = 20) {
    try {
      const totalDocuments = await super.getCollection().countDocuments({});

      const totalPages = Math.ceil(totalDocuments / itemsPerPage);
      const items = await super.findByFilter({
        sort: { type: -1 },
        skip: (page - 1) * itemsPerPage,
        limit: itemsPerPage,
      });

      return {
        totalDocuments,
        totalPages,
        page,
        itemsPerPage,
        items,
      };
    } catch (error) {
      throw error;
    }
  }

  public async insertNewPelicula(newPelicula: IPeliculas) {
    try {
      const { _id, ...newObject } = newPelicula;
      const result = await super.createOne(newObject);
      return result;
    } catch (ex: unknown) {
      throw ex;
    }
  }

  public async updatePelicula(updatePelicula: IPeliculas) {
    try {
      const { _id, ...updateObject } = updatePelicula;
      const result = await super.update(_id as string, updateObject);
      return result;
    } catch (ex: unknown) {
      throw ex;
    }
  }

  public async deletePelicula(deletePelicula: Partial<IPeliculas>) {
    try {
      const { _id } = deletePelicula;
      const result = await super.delete(_id as string);
      return result;
    } catch (ex: unknown) {
      throw ex;
    }
  }
}

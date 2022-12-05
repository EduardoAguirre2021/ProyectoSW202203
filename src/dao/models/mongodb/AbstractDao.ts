import { IDaoObject } from '@server/dao/daoBase';
import {
  ObjectId,
  Db,
  Collection,
  WithId,
  Filter,
  Document,
  InsertOneResult,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateResult,
  DeleteResult,
  FindOptions,
  AggregateOptions,
} from 'mongodb';

export abstract class Abstract<T> implements IDaoObject {
  public persistanceName: string;
  private connection: Db;
  private collection: Collection<T>;

  constructor(persistanceName: string, connection?: Db) {
    this.persistanceName = persistanceName;

    if (connection) {
      this.connection = connection;
      this.collection = this.connection.collection(persistanceName);
    } else {
      throw new Error('No db connection found');
    }
  }

  public async findAll(): Promise<WithId<T>[]> {
    return await this.collection.find({}).toArray();
  }

  public async findById(identifier: string): Promise<WithId<T>> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return await this.collection.findOne({ _id });
  }

  public async findByFilter(
    filter: Filter<T>,
    options: FindOptions<T> = {},
  ): Promise<WithId<T>[]> {
    return this.collection.find(filter, options).toArray();
  }

  public findOneByFilter(
    filter: Filter<T>,
    options: FindOptions<T> = {},
  ): Promise<WithId<T>> {
    return this.collection.findOne(filter, options);
  }

  public findOneByIdFilter(identifier: string,
    options: FindOptions<T> = {},
  ): Promise<WithId<T>> {
    const _id= new ObjectId(identifier) as Filter<T>;
    return this.collection.findOne(_id, options);
  }

  public async createOne(
    data: OptionalUnlessRequiredId<T>,
  ): Promise<InsertOneResult<T>> {
    return await this.collection.insertOne(data);
  }

  public async update(
    identifier: string,
    data: Partial<T>,
  ): Promise<UpdateResult> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return this.collection.updateOne({ _id }, {
      $set: data,
    } as UpdateFilter<T>);
  }

  public async findItemsPaged(
    options: FindOptions<T> = {},
  ): Promise<WithId<T>[]> {
    return this.collection.find({}, options).toArray();
  }

  public async UpdateRaw(
    identifier: string,
    data: UpdateFilter<T>,
  ): Promise<UpdateResult> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return this.collection.updateOne({ _id }, data);
  }

  public async delete(identifier: string): Promise<DeleteResult> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return this.collection.deleteOne({ _id });
  }

  public async aggregate(
    stages: Document[],
    options: AggregateOptions,
  ): Promise<Document[]> {
    return this.collection.aggregate(stages, options).toArray();
  }

  public getCollection(): Collection<T> {
    return this.collection;
  }
}

import { MongoClient } from 'mongodb';

let connection: MongoClient = null;
let mongoURI = process.env.MONGO_URI || 'mongo://localhost:27017';
let mongodbName = process.env.MONGO_NAME || '';

export const getConnection = async () => {
  if (!connection) {
    connection = await MongoClient.connect(mongoURI);
  }

  return connection.db(mongodbName);
};

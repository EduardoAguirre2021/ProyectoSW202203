import { getConnection } from '@models/mongodb/MongodbConnection';
import { GoogleUsers } from '@models/mongodb/googleUsersDao';

export class UsersGoogle {
  private dao: GoogleUsers;
  public constructor() {
    getConnection()
      .then((connection) => {
        this.dao = new GoogleUsers(connection);
      })
      .catch((error) => console.log(error));
  }

  public async signInOrLoginWithGoogle(
    displayName: string,
    email: string,
    IdGoogle: string,
  ) {
    try {
      const userExists = await this.dao.getUserByEmail(email);
      if (!!!userExists) {
        const newGoogleUser = {
          displayName,
          email,
          status: 'ACT',
          created: new Date(),
          lastLogin: new Date(),
          IdGoogle,
        };

        return this.dao.createUser(newGoogleUser);
      } else {
        await this.dao.logIn(userExists._id.toString());
        return userExists;
      }
    } catch (error) {
      throw error;
    }
  }
}
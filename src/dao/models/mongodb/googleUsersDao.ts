import { IUserGoogle } from "@dao/models/entities/User"
import { Abstract } from "@dao/models/mongodb/AbstractDao";
import { Db } from "mongodb";

export class GoogleUsers extends Abstract<IUserGoogle> {
    public constructor(db: Db) {
        super('GoogleUsers', db);
    }

    createUser( user: IUserGoogle) {
        const { IdGoogle, ...newUser}= user;
        return this.createOne(newUser);
    }

    logIn(id: string) {
        return this.update(id, { lastLogin: new Date() });
      }
    
      getUserByEmail(email: string) {
        const query = { email };
        return this.findOneByFilter(query);
      }
}

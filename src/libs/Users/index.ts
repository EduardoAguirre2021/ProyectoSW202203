import { getConnection } from "@dao/models/mongodb/MongodbConnection";
import { UserDao } from "@dao/models/mongodb/UsersDao";
import { getHash, compareHash } from "@utils/passHash";

export class Users {
    private dao: UserDao; 
    public constructor() {
        getConnection().then( conn => {
            this.dao= new UserDao(conn);
        }).catch(error=> console.error(error));
    }

    
}
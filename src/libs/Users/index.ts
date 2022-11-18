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

    public signin(name: string, username: string, email:string, password: string, birthDate: Date) {
        const currentDate= new Date(); 
        const newUser= {
            name,
            email,
            username,
            password: getHash(password),
            birthDate: birthDate,
            status: 'ACT', 
            oldPasswords: [] as string[],
            created: currentDate, 
            updated: currentDate, 
            roles: ['public'],
            _id: null
        };
        return this.dao.createUser(newUser);
    }

}
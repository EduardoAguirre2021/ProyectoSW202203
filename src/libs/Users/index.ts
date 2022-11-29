import { getConnection } from "@dao/models/mongodb/MongodbConnection";
import { UserDao } from "@dao/models/mongodb/UsersDao";
import { getHash } from "@utils/passHash";

const availableRole = ['public', 'admin', 'auditor', 'support'];
const availableStatus= ['ACT', 'INA'];

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
            birthDate: new Date(birthDate),
            status: 'ACT', 
            oldPasswords: [] as string[],
            created: currentDate, 
            updated: currentDate, 
            roles: ['public'],
            _id: null
        };
        return this.dao.createUser(newUser);
    }

    public updateUser(id: string ,username: string, email:string, status: string) {
        const currentDate= new Date(); 
        if(!availableStatus.includes(status)) {
            throw new Error("Status incorrecto");
        }
        const updateUser= {
            username,
            email, 
            status,
            updated: currentDate
        };

        return this.dao.updateUser(id, updateUser);
    }

    public findUserByEmail(email: string) {
       return this.dao.getUserByEmail(email);
    }

    public getAll() {
        return this.dao.getAllUsers();
    }

    public findUserByUsername(username: string) {
        return this.dao.getUserByUsername(username);
    }

    public async addUserRole(id: string ,role:string) {
        const currentDate= new Date(); 
        if(!availableRole.includes(role)) {
            throw new Error("Role incorrecto");
        }

        return this.dao.addRoleToUser(id,role,currentDate);
    }

    public async removeRoleToUser(id: string, role: string) {
        const currentDate= new Date();
        if(!availableRole.includes(role)) {
            throw new Error("Role incorrecto");
        }

        return this.dao.removeRoleToUser(id, role, currentDate);

    }




}
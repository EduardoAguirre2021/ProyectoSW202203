import { IUser } from "@dao/models/entities/User";
import { Db } from "mongodb";
import { Abstract } from "@dao/models/mongodb/AbstractDao";



export class UserDao extends Abstract<IUser> {
    public constructor(db: Db) {
        super('users', db);
    };

    createUser(user: IUser) {
        const { _id, ...newUser}= user;
        return this.createOne(newUser);
    };

    updateUser(id: string, user: Partial<IUser>) {
        return this.update(id, user);
    }

    getUserByEmail( email: string ) {
        const query= {email};
        return this.findByFilter(query);
    }

    getUserByUsername (username: string) {
        const query= {username};
        return this.findByFilter(query);
    }

    getAllUsers () {
        return this.findAll();
    }

    addRoleToUser( id: string, role: string, currentDate: Date) {
        return this.UpdateRaw(id, {$set: {updated: currentDate}, $addToSet: {roles: role}});
    }

    removeRoleToUser(id: string,role: string ,currentDate: Date) {
        return this.UpdateRaw(id, {$pull: {roles: role}, $set: { updated: currentDate }});
    }

    changePassword(id: string, newPassword: string, lastPassword: string) {
        return this.UpdateRaw(id, {$set: {password:newPassword}, $addToSet: {oldPasswords: lastPassword}});
    }


    public async getUsersByUserPaged(page:number=1, itemsPerPage: number=10){
        try {
          const total = await super.getCollection().countDocuments({});
          const totalPages = Math.ceil(total / itemsPerPage);
          const items = await super.findItemsPaged({
            sort: { "birthDate": -1 },
            skip: (page - 1) * itemsPerPage,
            limit: itemsPerPage,
          });
            return {
              total,
              totalPages,
              page,
              itemsPerPage,
              items
            };
        } catch (ex) {
          console.log("UsersDao mongodb:", (ex as Error).message);
          throw ex;
        }
      }
}

import { getConnection } from '@dao/models/mongodb/MongodbConnection';
import { UserDao } from '@dao/models/mongodb/UsersDao';
import { compareHash, getHash } from '@utils/passHash';
import { sent } from '@utils/nodemailer';
import { sign } from '@utils/jwt';

const availableRole = ['public', 'admin', 'auditor', 'support'];
const availableStatus = ['ACT', 'INA'];

export class Users {
  private dao: UserDao;
  public constructor() {
    getConnection()
      .then((conn) => {
        this.dao = new UserDao(conn);
      })
      .catch((error) => console.error(error));
  }

  public signin(
    name: string,
    username: string,
    email: string,
    password: string,
    birthDate: Date,
  ) {
    const currentDate = new Date();
    const newUser = {
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
      _id: null,
    };
    return this.dao.createUser(newUser);
  }

  public updateUser(
    id: string,
    username: string,
    email: string,
    status: string,
  ) {
    const currentDate = new Date();
    if (!availableStatus.includes(status)) {
      throw new Error('Status incorrecto');
    }
    const updateUser = {
      username,
      email,
      status,
      updated: currentDate,
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

  public async addUserRole(id: string, role: string) {
    const currentDate = new Date();
    if (!availableRole.includes(role)) {
      throw new Error('Role incorrecto');
    }

    return this.dao.addRoleToUser(id, role, currentDate);
  }

  public async removeRoleToUser(id: string, role: string) {
    const currentDate = new Date();
    if (!availableRole.includes(role)) {
      throw new Error('Role incorrecto');
    }

    return this.dao.removeRoleToUser(id, role, currentDate);
  }

  //funcion para loguear al usuario
  public async login(email: string, password: string) {
    try {
      const user = await this.dao.getUserByEmail2(email);

      if (!!!user) {
        console.log('LOGIN: USER NOT FOUND: ', `${email}`);
        throw new Error('User not found');
      }

      if (user.status !== 'ACT') {
        console.log(
          'LOGIN: STATUS NOT ACTIVE: ',
          `${user.email} - ${user.status}`,
        );
        throw new Error('Usuario no activo');
      }

      if (!compareHash(password, user.password)) {
        console.log(
          'LOGIN: PASSWORD INVALID: ',
          `${user.email} - ${user.status}`,
        );
        throw new Error('Contraseña incorrecta');
      }

      const { name, email: emailUser, _id } = user;
      const returnUser = { name, email: emailUser, _id };
      return { ...returnUser, token: sign(returnUser) };
    } catch (error) {
      console.log('LOGIN: ', error);
      throw error;
    }
  }

  public getUsersByUserPaged(page: number, items: number) {
    return this.dao.getUsersByUserPaged(page, items);
  }

  //funcion para enviar el correo de recuperacion de contraseña con el pin
  public async recoverPassword(email: string, pin: number) {
    const result = await this.dao.getUserByEmail(email);
    if (result.length === 0) {
      return false;
    } else {
      const user = result[0];
      //const pin = Math.floor(Math.random() * 1000000);

      try {
        sent(user.email, pin);
        return true;
      } catch (error) {
        return false;
      }
    }
  }

  public async changePassword(email: string, password: string) {
    const result = await this.dao.getUserByEmail(email);
    if (result.length === 0) {
      return false;
    } else {
      const user = result[0];
      const currentDate = new Date();
      const updateUser = {
        password: getHash(password),
        updated: currentDate,
      };

      if (this.dao.updateUser(user._id.toString(), updateUser)) {
        return true;
      } else {
        return false;
      }
    }
  }
}

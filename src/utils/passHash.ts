import * as bcrypt  from "bcrypt";


export const getHash= (password:string) => {
    const hash= bcrypt.hashSync(password, 10);
    return hash;
}

export const compareHash= ( plainPassword: string, password: string) => {
    const value= bcrypt.compareSync(plainPassword, password);
    return value;
}
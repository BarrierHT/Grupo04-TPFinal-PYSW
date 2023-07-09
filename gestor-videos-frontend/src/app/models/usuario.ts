export class Usuario {
    _id!: string;
    name!: string;
    password!: string;
    email!: string;
    phoneNumber!: string;
    username!: string;
    role: string = 'user';
    country!: {
        iso2: string,
        name: string
    }
}

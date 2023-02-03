export class User {

    constructor (
        public _id: string,
        public firstName: string,
        public lastName: string,
        public birthDate: Date,
        public city: string,
        public country: string,
        public email: string,
        public password: string,
        public confirmPassword: string
    ){}
}
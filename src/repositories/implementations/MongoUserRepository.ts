import { User } from "../../entities/User";
import { userModel } from "../../models/userModel";
import { IUserRepository } from "../IUserRepository";

export class MongoUserRepository implements IUserRepository {

    constructor() {}

    async signUp(user: User): Promise<void> {
        const newUser = new userModel({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            city: user.city,
            country: user.country,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword
        });
        await newUser.save();
    }
    async signIn(email: string, password: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async updateAllFields(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
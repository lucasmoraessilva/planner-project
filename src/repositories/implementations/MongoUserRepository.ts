import mongoose, { Types } from "mongoose";
import { User } from "../../entities/User";
import { userSchema } from "../../schemas/userSchema";
import { IUserRepository } from "../IUserRepository";

export class MongoUserRepository implements IUserRepository {

    constructor() {
        mongoose.connect(
            process.env.MONGO_DEV_URL!
                .replace(
                    '<USERNAME>:<PASSWORD>',
                    `${process.env.MONGO_DEV_USERNAME}:${process.env.MONGO_DEV_PASSWORD}`
                )
        );
    }

    async signUp(user: User): Promise<void> {
        const userModel = mongoose.model('User', userSchema);
        const userDoc = new userModel({
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
        await userDoc.save();
    }
    async signIn(email: string, password: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async updateAllFields(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
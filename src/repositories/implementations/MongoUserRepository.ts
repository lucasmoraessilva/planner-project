import { User } from "../../entities/User";
import { userModel } from "../../models/userModel";
import { IUserRepository } from "../IUserRepository";
import crypto from "crypto"

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

    async signIn(email: string, password: string): Promise<User> {
        const userId = await userModel.exists({
            email: email,
            password: crypto.createHash('sha256').update(password).digest('hex')
        });

        const user = await userModel.findOne({ _id: userId });

        return new User(
            user!._id.toString(),
            user!.firstName,
            user!.lastName,
            user!.birthDate,
            user!.city,
            user!.country,
            user!.email,
            '',
            ''
        );
    }

    async updateAllFields(user: User): Promise<void> {
        await userModel.updateOne({ _id: user._id },
            {
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: user.birthDate,
                city: user.city,
                country: user.country,
                email: user.email,
                password: crypto.createHash('sha256').update(user.password).digest('hex'),
                confirmPassword: crypto.createHash('sha256').update(user.confirmPassword).digest('hex')
            });
    }
}
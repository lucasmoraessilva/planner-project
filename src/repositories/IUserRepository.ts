import { User } from "../entities/User";

export interface IUserRepository {
    signUp(user: User): Promise<void>;
    signIn(email: string, password: string): Promise<boolean>;
    updateAllFields(user: User): Promise<void>;
}
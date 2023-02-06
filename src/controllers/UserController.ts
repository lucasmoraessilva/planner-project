import { IUserRepository } from "../repositories/IUserRepository";
import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
import { Types } from "mongoose";
import crypto from "crypto"

export class UserController{
    private static userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        UserController.userRepository = userRepository;
    }

    async signUp(request: Request, response: Response, next: NextFunction){
        const {
            firstName,
            lastName,
            birthDate,
            city,
            country,
            email,
            password,
            confirmPassword
        } = request.body;

        await UserController.userRepository.signUp(new User(
            new Types.ObjectId().toHexString(),
            firstName,
            lastName,
            new Date(birthDate),
            city,
            country,
            email,
            crypto.createHash('sha256').update(password).digest('hex'),
            crypto.createHash('sha256').update(confirmPassword).digest('hex')
        ));

        response.status(201).send();
    }
}
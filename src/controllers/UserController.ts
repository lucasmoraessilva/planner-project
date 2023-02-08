import { IUserRepository } from "../repositories/IUserRepository";
import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
import { Types } from "mongoose";
import crypto from "crypto";
import { sign } from "jsonwebtoken";
import { RepositoryError } from "../errors/RepositoryError";

export class UserController{
    private static userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        UserController.userRepository = userRepository;
    }

    async signUp(request: Request, response: Response, next: NextFunction) {
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

        try {
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
    
            response.status(204).send();
        }
        catch (error: any) {
            error instanceof RepositoryError
            ? response.status(400).send({ error: error.message })
            : next(error)
        }
    }

    async signIn(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;

        try {
            const user = await UserController.userRepository.signIn(email, password);

            const token = await sign(
                { _id: user._id },
                process.env.JWT_SECRET!,
                { expiresIn: '12h' }
            )
            
            response
                .status(204)
                .cookie(
                    'jwt',
                    token,
                    {
                        httpOnly: true,
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 12)
                    }
                )
                .send()
        }
        catch (error: any) {
            error instanceof RepositoryError
            ? response.status(400).send({ error: error.message })
            : next(error)
        }
    }

    async updateAllFields(request: Request, response: Response, next: NextFunction) {
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

        const { _id } = request.params;

        try {
            await UserController.userRepository.updateAllFields(new User(
                _id,
                firstName,
                lastName,
                new Date(birthDate),
                city,
                country,
                email,
                password,
                confirmPassword
            ));
    
            response.status(204).send();
        }
        catch (error: any) {
            error instanceof RepositoryError
            ? response.status(400).send({ error: error.message })
            : next(error)
        }
    }
}
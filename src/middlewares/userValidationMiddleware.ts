import { Request, Response, NextFunction } from "express";
import { userValidator } from "../validators/userValidator";

export function userValidationMiddleware(request: Request, response: Response, next: NextFunction) {
    const validationErrors = validateUserProperties(userValidator, request.body);

    if(validationErrors.length){
        return response.status(400).json({
            errors: validationErrors
        });
    }

    next();
}

function validateUserProperties(validator: any, objectToBeValidated: any){
    let errors: string[] = [];

    Object.keys(validator).forEach(key => {
        let validationError;
        key !== 'confirmPassword'
            ? validationError = validator[key](objectToBeValidated[key])
            : validationError = validator[key](objectToBeValidated[key], objectToBeValidated.password);

        if(validationError)
            errors.push(validationError);
    });

    return errors;
}

export function signInValidationMiddleware(request: Request, response: Response, next: NextFunction) {
    const validationErrors = [
        userValidator.email(request.body.email),
        userValidator.password(request.body.password)
    ].filter(error => error !== null);

    if(validationErrors.length){
        return response.status(400).json({
            errors: validationErrors
        });
    }

    next();
}
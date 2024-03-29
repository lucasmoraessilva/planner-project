import { Request, Response, NextFunction } from "express";
import { eventValidator } from "../validators/eventValidator";

export function eventValidationMiddleware(request: Request, response: Response, next: NextFunction) {
    const validationErrors = validateEventProperties(eventValidator, request.body);

    if(validationErrors.length){
        return response.status(400).json({
            errors: validationErrors
        });
    }

    next();
}

function validateEventProperties(validator: any, objectToBeValidated: any){
    let errors: string[] = [];

    Object.keys(validator).forEach(key => {
        const validationError = validator[key](objectToBeValidated[key]);

        if(validationError)
            errors.push(validationError);
    });

    return errors;
}

export async function eventIdValidationMiddleware(request: Request, response: Response, next: NextFunction) {
    const { _id } = request.params;

    const error = await eventValidator._id(_id);

    if(error)
        return response.status(400).json({error});

    next();
}
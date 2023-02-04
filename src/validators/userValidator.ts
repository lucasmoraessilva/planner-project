import Joi from "joi";

export const userValidator = {
    firstName(firstName: string): string | null {
        const schema = Joi
            .string()
            .required()
            .min(3)
            .messages({
                'string.base': "'firstName' is not a text type",
                'string.min': "'firstName' must be at least 3 characters",
                'string.empty': "'firstName' cannot be empty",
                'any.required': "'firstName' is required"
            });

        const { error } = schema.validate(firstName);

        return error ? error.message : null;
    },

    lastName(lastName: string): string | null {
        const schema = Joi
            .string()
            .required()
            .min(3)
            .messages({
                'string.base': "'lastName' is not a text type",
                'string.min': "'lastName' must be at least 3 characters",
                'string.empty': "'lastName' cannot be empty",
                'any.required': "'lastName' is required"
            });

        const { error } = schema.validate(lastName);

        return error ? error.message : null;
    },

    birthDate(birthDate: string): string | null {
        const schema = Joi
            .date()
            .required()
            .iso()
            .messages({
                'date.base': "'birthDate' is not a date type",
                'date.format': "'birthDate' must be in YYYY-MM-DD format",
                'any.required': "'birthDate' is required"
            });

        const { error } = schema.validate(birthDate);

        return error ? error.message : null;
    },

    city(city: string): string | null {
        const schema = Joi
            .string()
            .required()
            .min(2)
            .messages({
                'string.base': "'city' is not a text type",
                'string.min': "'city' must be at least 2 characters",
                'string.empty': "'city' cannot be empty",
                'any.required': "'city' is required"
            });

        const { error } = schema.validate(city);

        return error ? error.message : null;
    },

    country(country: string): string | null {
        const schema = Joi
            .string()
            .required()
            .min(3)
            .messages({
                'string.base': "'country' is not a text type",
                'string.min': "'country' must be at least 3 characters",
                'string.empty': "'country' cannot be empty",
                'any.required': "'country' is required"
            });

        const { error } = schema.validate(country);

        return error ? error.message : null;
    },

    email(email: string): string | null {
        const schema = Joi
            .string()
            .required()
            .email({
                tlds: false
            })
            .messages({
                'string.base': "'email' is not a text type",
                'string.email': "'email' does not have a valid format",
                'string.empty': "'email' cannot be empty",
                'any.required': "'email' is required"
            });

        const { error } = schema.validate(email);

        return error ? error.message : null;
    },

    password(password: string): string | null {
        const schema = Joi
            .string()
            .required()
            .min(5)
            .messages({
                'string.base': "'password' is not a text type",
                'string.min': "'password' must be at least 5 characters",
                'string.empty': "'password' cannot be empty",
                'any.required': "'password' is required"
            });

        const { error } = schema.validate(password);

        return error ? error.message : null;
    },

    confirmPassword(confirmPassword: string, password: string): string | null {
        if(password !== confirmPassword)
            return "password' and 'confirmPassword' are different";

        const schema = Joi
            .string()
            .required()
            .min(5)
            .messages({
                'string.base': "'confirmPassword' is not a text type",
                'string.min': "'confirmPassword' must be at least 5 characters",
                'string.empty': "'confirmPassword' cannot be empty",
                'any.required': "'confirmPassword' is required"
            });

        const { error } = schema.validate(confirmPassword);

        return error ? error.message : null;
    }
}
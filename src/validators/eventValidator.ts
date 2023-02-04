import Joi from "joi";

export const eventValidator = {
    description(description: string): string | null {
        const schema = Joi
            .string()
            .required()
            .min(1)
            .messages({
                'string.base': "'description' is not a text type",
                'string.min': "'description' must be at least 1 character",
                'string.empty': "'description' cannot be empty",
                'any.required': "'description' is required"
            });

        const { error } = schema.validate(description);

        return error ? error.message : null;
    },

    userId(description: string): string | null {
        const schema = Joi
            .string()
            .required()
            .hex()
            .length(24)
            .messages({
                'string.base': "'description' is not a text type",
                'string.empty': "'description' cannot be empty",
                'any.required': "'description' is required",
                'string.hex': "'description' must be a hexadecimal value",
                'string.length': "'description' must be 24 characters",
            });

        const { error } = schema.validate(description);

        return error ? error.message : null;
    },

    dateTime(dateTime: string): string | null {
        const schema = Joi
            .date()
            .required()
            .iso()
            .min('now')
            .messages({
                'date.base': "'dateTime' is not a date type",
                'any.required': "'dateTime' is required",
                'date.format': "'dateTime' must be in YYYY-MM-DD format",
                'date.min': "'dateTime' must be after the current date and time"
            });

        const { error } = schema.validate(dateTime);

        return error ? error.message : null;
    },

    createdAt(createdAt: string): string | null {
        const schema = Joi
            .date()
            .iso()
            .messages({
                'date.base': "'createdAt' is not a date type",
                'date.format': "'createdAt' must be in YYYY-MM-DD format"
            });

        const { error } = schema.validate(createdAt);

        return error ? error.message : null;
    }
}
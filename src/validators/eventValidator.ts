import Joi from "joi";

export const eventValidator = {
    _id(_id: string): string | null {
        const schema = Joi
            .string()
            .hex()
            .length(24)
            .messages({
                'string.base': "'_id' is not a text type",
                'string.empty': "'_id' cannot be empty",
                'string.hex': "'_id' must be a hexadecimal value",
                'string.length': "'_id' must be 24 characters"
            });

        const { error } = schema.validate(_id);

        return error ? error.message : null;
    },

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

    userId(userId: string): string | null {
        const schema = Joi
            .string()
            .required()
            .hex()
            .length(24)
            .messages({
                'string.base': "'userId' is not a text type",
                'string.empty': "'userId' cannot be empty",
                'any.required': "'userId' is required",
                'string.hex': "'userId' must be a hexadecimal value",
                'string.length': "'userId' must be 24 characters"
            });

        const { error } = schema.validate(userId);

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
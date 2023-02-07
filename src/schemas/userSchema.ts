import { Schema, Types } from "mongoose";

export const userSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        minLength: 3
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3
    },
    birthDate: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true,
        minLength: 2
    },
    country: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        select: false
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 5,
        select: false
    }
});
import { Schema, Types } from "mongoose";

export const eventSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minLength: 1
    },
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dateTime: {
        type: Date,
        required: true,
        min: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    dayOfTheWeek: {
        type: String,
        default: function () {
            // @ts-ignore
            return String(this.dateTime.getDay());
        },
        select: false
    }
});
import { Schema, Types } from "mongoose";

export const eventSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dateTime: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    dayOfTheWeek: {
        type: String,
        immutable: true,
        default: function () {
            // @ts-ignore
            return String(this.dateTime.getDay());
        }
    }
});
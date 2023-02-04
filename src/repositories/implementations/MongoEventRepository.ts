import mongoose from "mongoose";
import { Event } from "../../entities/Event";
import { eventSchema } from "../../schemas/eventSchema";
import { IEventRepository } from "../IEventRepository";


export class MongoEventRepository implements IEventRepository {

    getAll(userId: string): Promise<Event[]> {
        throw new Error("Method not implemented.");
    }
    getByWeekday(weekday: string): Promise<Event> {
        throw new Error("Method not implemented.");
    }
    getById(eventId: string): Promise<Event> {
        throw new Error("Method not implemented.");
    }

    async create(event: Event): Promise<void> {
        const eventModel = mongoose.model('Event', eventSchema);
        const newEvent = new eventModel({
            _id: event._id,
            description: event.description,
            userId: event.userId,
            dateTime: event.dateTime,
            createdAt: event.createdAt
        });
        await newEvent.save();
    }
}
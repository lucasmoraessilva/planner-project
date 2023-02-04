import { Event } from "../../entities/Event";
import { eventModel } from "../../models/eventModel";
import { IEventRepository } from "../IEventRepository";

export class MongoEventRepository implements IEventRepository {

    constructor() {}

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
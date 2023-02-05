import { Event } from "../../entities/Event";
import { eventModel } from "../../models/eventModel";
import { IEventRepository } from "../IEventRepository";

export class MongoEventRepository implements IEventRepository {

    constructor() {}

    async getAll(userId: string): Promise<Event[]> {
        const events = await eventModel.find({ userId });
        
        return events.map(
            event => new Event(
                event._id.toString(),
                event.description,
                event.userId.toString(),
                event.dateTime,
                event.createdAt
            )
        );
    }

    getByWeekday(weekday: string): Promise<Event> {
        throw new Error("Method not implemented.");
    }
    
    async getById(eventId: string): Promise<Event> {
        const event = await eventModel.findOne({ _id: eventId });
        return new Event(
            event!._id.toString(),
            event!.description,
            event!.userId.toString(),
            event!.dateTime,
            event!.createdAt
        );
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

    async delete(eventId: string): Promise<void> {
        await eventModel.deleteOne({ _id: eventId });
    }
}
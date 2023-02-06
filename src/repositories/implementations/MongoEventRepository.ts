import { Event } from "../../entities/Event";
import { eventModel } from "../../models/eventModel";
import { IEventRepository } from "../IEventRepository";

export class MongoEventRepository implements IEventRepository {

    constructor() {}

    async getAll(dayOfTheWeek?: string): Promise<Event[]> {
        let events = await eventModel.find();

        if(dayOfTheWeek)
            events = events.filter(event => event.dayOfTheWeek === dayOfTheWeek);
        
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
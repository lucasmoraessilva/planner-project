import { Event } from "../../entities/Event";
import { eventModel } from "../../models/eventModel";
import { IEventRepository } from "../IEventRepository";

export class MongoEventRepository implements IEventRepository {

    constructor() {}

    async getAll(dayOfTheWeek?: string): Promise<Event[]> {
        let query = eventModel.find();

        if(dayOfTheWeek)
            query.where('dayOfTheWeek').equals(dayOfTheWeek);

        const events = await query;
        
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

    async deleteByWeekday(dayOfTheWeek: string): Promise<void> {
        await eventModel.deleteMany({ dayOfTheWeek });
    }

    async update(event: Event): Promise<void> {
        await eventModel.updateOne({ _id: event._id }, {
            description: event.description,
            dateTime: event.dateTime,
            dayOfTheWeek: new Date(event.dateTime).getDay().toString()
        });
    }
}
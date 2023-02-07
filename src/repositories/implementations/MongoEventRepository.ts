import { Event } from "../../entities/Event";
import { RepositoryError } from "../../errors/RepositoryError";
import { eventModel } from "../../models/eventModel";
import { IEventRepository } from "../IEventRepository";

export class MongoEventRepository implements IEventRepository {

    constructor() {}

    async getAll(dayOfTheWeek?: string): Promise<Event[]> {
        let query = eventModel.find();

        if(dayOfTheWeek){
            if(Number.parseInt(dayOfTheWeek) < 0 || Number.parseInt(dayOfTheWeek) > 6){
                return Promise.reject(new RepositoryError('The day of the week must be a value between 0 and 6'))
            }
            
            query.where('dayOfTheWeek').equals(dayOfTheWeek);
        }

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
        const eventIdExists = await eventModel.exists({ _id: eventId });

        if(!eventIdExists) {
            return Promise.reject(new RepositoryError('The event with the specified _id was not found'));
        }

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
        const eventIdExists = await eventModel.exists({ _id: eventId });

        if(!eventIdExists) {
            return Promise.reject(new RepositoryError('The event with the specified _id was not found'));
        }

        await eventModel.deleteOne({ _id: eventId });
    }

    async deleteByWeekday(dayOfTheWeek: string): Promise<void> {
        if(Number.parseInt(dayOfTheWeek) < 0 || Number.parseInt(dayOfTheWeek) > 6) {
            return Promise.reject(new RepositoryError('The day of the week must be a value between 0 and 6'))
        }

        await eventModel.deleteMany({ dayOfTheWeek });
    }

    async update(event: Event): Promise<void> {
        const eventIdExists = await eventModel.exists({ _id: event._id });

        if(!eventIdExists) {
            return Promise.reject(new RepositoryError('The event with the specified _id was not found'));
        }

        await eventModel.updateOne({ _id: event._id }, {
            description: event.description,
            dateTime: event.dateTime,
            dayOfTheWeek: new Date(event.dateTime).getDay().toString()
        });
    }
}
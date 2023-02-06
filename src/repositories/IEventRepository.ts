import { Event } from "../entities/Event";

export interface IEventRepository {
    getAll(dayOfTheWeek?: string): Promise<Event[]>;
    getById(eventId: string): Promise<Event>;
    create(event: Event): Promise<void>;
    delete(eventId: string): Promise<void>;
}
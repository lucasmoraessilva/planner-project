import { Event } from "../entities/Event";

export interface IEventRepository {
    getAll(userId: string): Promise<Event[]>;
    getByWeekday(weekday: string): Promise<Event>;
    getById(eventId: string): Promise<Event>;
    create(event: Event): Promise<void>;
}
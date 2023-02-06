import { Request, Response, NextFunction } from "express";
import { IEventRepository } from "../repositories/IEventRepository";
import { Event } from "../entities/Event";
import { Types } from "mongoose";

export class EventController{
    private static eventRepository: IEventRepository;

    constructor(eventRepository: IEventRepository) {
        EventController.eventRepository = eventRepository;
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const {
            description,
            userId,
            dateTime,
            createdAt
        } = request.body;

        await EventController.eventRepository.create(new Event(
            new Types.ObjectId().toHexString(),
            description,
            userId,
            dateTime,
            createdAt
        ));

        response.status(201).send();
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        const { dayOfTheWeek } = request.query;

        let events = await EventController.eventRepository.getAll(dayOfTheWeek as string);

        response.status(200).send(events);
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        const event = await EventController.eventRepository.getById(request.params._id);

        response.status(200).send(event);
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        const { _id } = request.params;

        await EventController.eventRepository.delete(_id);

        response.status(200).send();
    }

    async deleteByWeekday(request: Request, response: Response, next: NextFunction) {
        const { dayOfTheWeek } = request.query;

        if(!dayOfTheWeek) {
            return response.status(400).send({error: "The 'dayOfTheWeek' parameter must be informed"});
        }

        await EventController.eventRepository.deleteByWeekday(dayOfTheWeek as string);
    
        response.status(200).send();
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const { _id } = request.params;
        const { description, dateTime } = request.body;

        await EventController.eventRepository.update(new Event(_id,description,'',dateTime,new Date()));

        response.status(200).send();
    }
}
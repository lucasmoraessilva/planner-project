import { Request, Response, NextFunction } from "express";
import { IEventRepository } from "../repositories/IEventRepository";
import { Event } from "../entities/Event";
import { Types } from "mongoose";
import { RepositoryError } from "../errors/RepositoryError";

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

        try {
            await EventController.eventRepository.create(new Event(
                new Types.ObjectId().toHexString(),
                description,
                userId,
                dateTime,
                createdAt
            ));
    
            response.status(201).send();
        }
        catch (error: any) {
            next(error);
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        const { dayOfTheWeek } = request.query;

        try {
            const events = await EventController.eventRepository.getAll(dayOfTheWeek as string);
    
            response.status(200).send(events);
        }
        catch (error: any) {
            error instanceof RepositoryError
            ? response.status(400).json({ error: error.message })
            : next(error);
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        const { _id } = request.params;

        try {
            const event = await EventController.eventRepository.getById(_id);

            response.status(200).send(event);
        }
        catch (error: any) {
            error instanceof RepositoryError
            ? response.status(400).json({ error: error.message })
            : next(error);
        }
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        const { _id } = request.params;

        try {
            await EventController.eventRepository.delete(_id);
    
            response.status(200).send();
        }
        catch (error: any) {
            error instanceof RepositoryError
            ? response.status(400).json({ error: error.message })
            : next(error);
        }
    }

    async deleteByWeekday(request: Request, response: Response, next: NextFunction) {
        const { dayOfTheWeek } = request.query;

        if(!dayOfTheWeek) {
            return response.status(400).send({error: "The 'dayOfTheWeek' parameter must be informed"});
        }

        try {
            await EventController.eventRepository.deleteByWeekday(dayOfTheWeek as string);
        
            response.status(200).send();
        }
        catch (error: any) {
            error instanceof RepositoryError
            ? response.status(400).json({ error: error.message })
            : next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const { _id } = request.params;
        const { description, dateTime } = request.body;

        try {
            await EventController.eventRepository.update(new Event(
                _id,
                description,
                '',
                new Date(dateTime),
                new Date())
            );
    
            response.status(200).send();
        }
        catch (error: any) {
            error instanceof RepositoryError
            ? response.status(400).json({ error: error.message })
            : next(error);
        }
    }
}
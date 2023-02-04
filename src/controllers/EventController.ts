import { Request, Response, NextFunction } from "express";
import { IEventRepository } from "../repositories/IEventRepository";
import { Event } from "../entities/Event";
import { Types } from "mongoose";

export class EventController{
    private static eventRepository: IEventRepository;

    constructor(eventRepository: IEventRepository) {
        EventController.eventRepository = eventRepository;
    }

    async create(request: Request, response: Response, next: NextFunction){
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
}
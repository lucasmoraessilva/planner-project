import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { eventValidationMiddleware } from "../middlewares/eventValidationMiddleware";
import { MongoEventRepository } from "../repositories/implementations/MongoEventRepository";

const eventRouter = Router({caseSensitive: true});
const eventController = new EventController(new MongoEventRepository());

eventRouter.post('/', eventValidationMiddleware, eventController.create);

export default eventRouter;
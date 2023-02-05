import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { eventIdValidationMiddleware, eventValidationMiddleware, userIdValidationMiddleware } from "../middlewares/eventValidationMiddleware";
import { MongoEventRepository } from "../repositories/implementations/MongoEventRepository";

const eventRouter = Router({caseSensitive: true});
const eventController = new EventController(new MongoEventRepository());

eventRouter.post('/', eventValidationMiddleware, eventController.create);
eventRouter.get('/:userId', userIdValidationMiddleware, eventController.getAll);
eventRouter.get('/:_id', eventIdValidationMiddleware, eventController.getById);

export default eventRouter;
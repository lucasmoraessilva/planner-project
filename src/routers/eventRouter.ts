import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { eventIdValidationMiddleware, eventValidationMiddleware } from "../middlewares/eventValidationMiddleware";
import { MongoEventRepository } from "../repositories/implementations/MongoEventRepository";

const eventRouter = Router({caseSensitive: true});
const eventController = new EventController(new MongoEventRepository());

eventRouter.post('/', eventValidationMiddleware, eventController.create);
eventRouter.get('/', eventController.getAll);
eventRouter.get('/:_id', eventIdValidationMiddleware, eventController.getById);
eventRouter.delete('/:_id', eventIdValidationMiddleware, eventController.delete);
eventRouter.delete('/', eventController.deleteByWeekday);
eventRouter.put('/:_id', eventIdValidationMiddleware, eventController.update);

export default eventRouter;
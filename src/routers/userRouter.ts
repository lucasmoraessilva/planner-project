import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { userValidationMiddleware } from "../middlewares/userValidationMiddleware";
import { MongoUserRepository } from "../repositories/implementations/MongoUserRepository";

const userRouter = Router({caseSensitive: true});
const userController = new UserController(new MongoUserRepository());

userRouter.post('/signUp', userValidationMiddleware, userController.signUp);

export default userRouter;
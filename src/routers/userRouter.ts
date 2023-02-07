import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { userValidationMiddleware, signInValidationMiddleware } from "../middlewares/userValidationMiddleware";
import { MongoUserRepository } from "../repositories/implementations/MongoUserRepository";

const userRouter = Router({caseSensitive: true});
const userController = new UserController(new MongoUserRepository());

userRouter.post('/signUp', userValidationMiddleware, userController.signUp);
userRouter.post('/signIn', signInValidationMiddleware, userController.signIn);
userRouter.put('/:_id', userValidationMiddleware, userController.updateAllFields);

export default userRouter;
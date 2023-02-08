import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import swaggerJson from "./swagger.json";

dotenv.config({
    path: `${__dirname}/../.env`
});

mongoose.connect(
    process.env.MONGO_DEV_URL!
        .replace(
            '<USERNAME>:<PASSWORD>',
            `${process.env.MONGO_DEV_USERNAME}:${process.env.MONGO_DEV_PASSWORD}`
        )
);

import userRouter from "./routers/userRouter"
import eventRouter from "./routers/eventRouter"
import { defaultErrorHandler } from "./middlewares/errorHandlingMiddleware";
const app = express()

app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);
app.use(defaultErrorHandler);

app.listen(process.env.API_PORT!, () => console.log('planner-api started'));
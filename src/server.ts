import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

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
const app = express()

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);

app.listen(process.env.API_PORT!, () => console.log('planner-api started'));
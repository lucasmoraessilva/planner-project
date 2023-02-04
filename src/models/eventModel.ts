import mongoose from "mongoose";
import { eventSchema } from "../schemas/eventSchema";

export const eventModel = mongoose.model('Event', eventSchema, 'events');
import { Request, Response, NextFunction } from "express";

export function defaultErrorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
    response.status(500).json({ error: error.message })
}
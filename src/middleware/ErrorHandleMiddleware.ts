import { NextFunction, Request, Response } from "express"
import { ApiError } from "../error/ApiError"

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof ApiError) res.status(err.status).json({ message: err.message, errors: err.errors })
    return res.status(500).json({message: "Непредвиденная ошибка"})
}
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/ApiError";
import TokenService from "../Token/Token.service";

export const AuthMiddleware = async (req: any, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const accessToken = req.headers.authorization?.split(' ')[1]
        if (!accessToken) return next(ApiError.unauthorized())
        const userData = await TokenService.verifyAccessToken(accessToken)
        
        if (!userData) return next(ApiError.unauthorized())

        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.unauthorized())
    }
}
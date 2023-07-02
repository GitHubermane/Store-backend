import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { roleType } from "../User/User.controller";
import { ApiError } from "../error/ApiError";
import TokenService from "../Token/Token.service";


//   Убрать в отдельный файл с типами
declare module "jsonwebtoken" {
    export interface JwtPayload {
        role: string;
    }
}
//   Вынести логику в отдельную функцию (одинакова с AuthMiddleware)
export const CheckRoleMiddleware = (role: roleType) => {
    return async (req: any, res: Response, next: NextFunction) => {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const accessToken = req.headers.authorization?.split(' ')[1]
            if (!accessToken) return next(ApiError.unauthorized())
            const userData = await TokenService.verifyAccessToken(accessToken) as JwtPayload

            if (userData?.role !== role) return next(ApiError.unauthorized())
            

            req.user = userData
            next()
        } catch (e) {
            return next(ApiError.unauthorized())
        }
    }
}
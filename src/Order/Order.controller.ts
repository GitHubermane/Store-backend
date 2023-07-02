import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../error/ApiError'
import OrderService from './Order.service'


export const OrderController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const order = await OrderService.create(refreshToken)

            return res.json(order)
        } catch (error: any) {
            next(ApiError.badRequest(error.message))

        }
    }
}

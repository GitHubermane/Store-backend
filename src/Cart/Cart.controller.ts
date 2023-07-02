import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../error/ApiError'
import CartService from './Cart.service'

export const CartController = {
    async getCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const cart = await CartService.getCart(refreshToken)

            return res.json(cart)
        } catch (error: any) {
            next(ApiError.badRequest(error.message))
        }
    },

    async addToCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const { id } = req.params
            const device = await CartService.addToCart(refreshToken, id)

            return res.json(device)
        } catch (error: any) {
            next(ApiError.badRequest(error.message))
        }
    },

    async changeQuantity(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const { id } = req.params
            const { quantity } = req.body
            const device = await CartService.changeQuantity(refreshToken, id, quantity)

            return res.json(device)
        } catch (error: any) {
            next(ApiError.badRequest(error.message))
        }
    },

    async deleteOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const { id } = req.params
            const device = await CartService.deleteOne(refreshToken, id)

            return res.json({message: 'Товар удален из корзины'})
        } catch (error: any) {
            next(ApiError.badRequest(error.message))
        }
    }
}


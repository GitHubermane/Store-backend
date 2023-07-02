import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../error/ApiError'
import FavouriteService from './Favourite.service'


export const FavouriteController = {
    
    async addOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const { id } = req.params
            const favDevices = await FavouriteService.create(refreshToken, id)
            return res.json(favDevices)
        } catch (error: any) {
            next(ApiError.badRequest(error.message))

        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const { refreshToken } = req.cookies
            const favDevices = await FavouriteService.getAll(refreshToken)
            return res.json(favDevices)
        } catch (error: any) {
            return res.json(error.message)
        }
    },

    async deleteOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const { id } = req.params
            const favDevices = await FavouriteService.deleteOne(refreshToken, id)
            return res.json(favDevices)
        } catch (error: any) {
            next(ApiError.badRequest(error.message))

        }
    },
}
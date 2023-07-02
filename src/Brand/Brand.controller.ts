import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../error/ApiError'
import BrandService from './Brand.service'

export const BrandController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const brand = await BrandService.create(req.body)
            return res.json(brand)
        } catch (error) {
            next(ApiError.badRequest('Введите название'))
        }
    },

    async getAll(req: Request, res: Response) {
        const brands = await BrandService.getAll()
        return res.json(brands)
    }
}


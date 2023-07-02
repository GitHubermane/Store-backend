import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../error/ApiError'
import TypeService from './Type.service'

export const TypeController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const type = await TypeService.create(req.body)
            return res.json(type)
        } catch (error: any) {
            next(ApiError.badRequest('Введите название'))
        }
    },

    async getAll(req: Request, res: Response) {
        const types = await TypeService.getAll()
        return res.json(types)
    }
}


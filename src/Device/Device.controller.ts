import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../error/ApiError'
import { UploadedFile } from 'express-fileupload'
import DeviceService from './Device.service'

export const DeviceController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const device = await DeviceService.create(req.body, req.files?.img as UploadedFile)
            return res.json(device)
        } catch (error: any) {
            next(ApiError.badRequest(error.message))

        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const devices = await DeviceService.getAll(req.query)
            return res.json(devices)
        } catch (error: any) {
            return res.json(error.message)
        }
    },

    async getOne(req: Request, res: Response) {
        try {
            const device = await DeviceService.getOne(req.params.id)
            return res.json(device)
        } catch (error: any) {            
            return res.json(error.message)
        }
    },

    async deleteOne(req: Request, res: Response) {
        try {
            await DeviceService.deleteOne(req.params.id)
            return res.json({ message: "Device deleted" })
        } catch (error: any) {
            return res.json(error.message)
        }
    },

    async deleteAll(req: Request, res: Response) {
        try {
            await DeviceService.deleteAll()
            return res.json({ message: "All devices deleted" })
        } catch (error) {
            return res.json(error)
        }
    },
}


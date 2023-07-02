import { NextFunction, Request, Response } from 'express'
import UserService from './User.service'
import { validationResult } from 'express-validator'
import { ApiError } from '../error/ApiError'

export type roleType = 'USER' | 'ADMIN'

export const UserController = {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
            const registratedUser = await UserService.registration(email, password)
            res.cookie('refreshToken', registratedUser.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(registratedUser)
        } catch (error) {
            next(error)
        }
    },

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link
            const userData = await UserService.activate(activationLink)
            return res.json({ userData })
        } catch (error) {
            next(error)
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const userData = await UserService.login(email, password)
            res.cookie('refreshToken', userData.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json({ userData })
        } catch (error) {
            next(error)
        }
    },

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData?.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json({userData})
        } catch (error) {
            next(error) 
        }
    },

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).json({ message: "Вы разлогинились"})
        } catch (error) {
            next(error)
        }
    },

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getAll()
            return res.json(users)
        } catch (error) {
            next(error)
        }
    },

    async deleteAll(req: Request, res: Response, next: NextFunction) {
        try {
            await UserService.deleteAll()
            return res.json({ message: "All users deleted" })
        } catch (error) {
            next(error)
        }
    },
}


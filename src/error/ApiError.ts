import { ValidationError } from "express-validator"

export class ApiError extends Error {
    status: number
    errors: Array<ValidationError>

    constructor(status: number, message: string, errors: Array<ValidationError> = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static unauthorized() {
        return new ApiError(401, "Пользователь не авторизован")
    }

    static badRequest(message: string, errors?: Array<ValidationError>) {
        return new ApiError(404, message, errors)
    }
}

type badRequestType = typeof ApiError.badRequest
export type ApiErrorType = ReturnType<badRequestType>
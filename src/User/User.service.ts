import bcrypt from 'bcrypt'
import { ApiError } from "../error/ApiError"
import TokenService from "../Token/Token.service"
import { UserDto } from "./User.dto"
import { v4 } from "uuid"
import MailService from "../service/Mail.service"
import { User } from '../../models/User.model'
import { Cart } from '../../models/Cart.model'
import { OrderDevice } from '../../models/Order.model'
import { Transaction } from '../../models/Transaction.model'


//  Функция создания генерации и сохранения токена
const generateJWT = async (user: User) => {
    const userDto = new UserDto(user)
    const tokens = TokenService.generateToken({ ...userDto })

    if (userDto) await TokenService.saveToken(Number(userDto.id), tokens.refreshToken)

    return { tokens, user: userDto }
}

class UserService {
    async registration(email: string, password: string) {
        if (!email || !password) throw ApiError.badRequest('Некорректный логин или пароль')

        const candidate = await User.findOne({ where: { email } })
        if (candidate) throw ApiError.badRequest('Пользователь с таким email уже существует')

        const hashPassword = await bcrypt.hash(password, 4)

        const activationLink = v4()

        const createdUser = await User.create({ email, password: hashPassword, activationLink, role: 'USER' })
        await Cart.create({
            userId: createdUser.id,
            total: 0,
        })
        await MailService.sendActiveMail(email, `http://localhost:${process.env.PORT}/api/user/activate/${activationLink}`)

        return generateJWT(createdUser)
    }

    async activate(activationLink: string) {
        const user = await User.findOne({ where: { activationLink } })
        if (!user) throw ApiError.badRequest('Некорректная ссылка')
        user.isActivated = true
        await user.save()

        return user
    }

    async login(email: string, password: string) {
        const findedUser = await User.findOne({ where: { email } })
        if (!findedUser) throw ApiError.badRequest('Пользователь не найден')
        if (!findedUser.isActivated) throw ApiError.badRequest('Необходимо активировать аккаунт')
        let comparePassword = bcrypt.compareSync(password, findedUser.password)
        if (!comparePassword) throw ApiError.badRequest('Пароль неверный')

        return generateJWT(findedUser)
    }

    async logout(refreshToken: string) {
        const token = TokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) throw ApiError.unauthorized()

        const userData = await TokenService.verifyRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) throw ApiError.unauthorized()

        const user = await User.findByPk(userData.id)

        if (user) return generateJWT(user)
    }

    async getAll() {
        const users = await User.findAll()
        return users
    }

    async deleteAll() {
        const users = await User.destroy({
            cascade: true,
            truncate: true,
            force: true
        })
        return users

    }
}


export default new UserService()
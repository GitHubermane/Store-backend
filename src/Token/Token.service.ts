import jwt from "jsonwebtoken"
import { UserDto } from "../User/User.dto"
import { Token } from "./Token.model"

class TokenService {
    generateToken(payload: UserDto) {
        const accessToken = jwt.sign(payload, String(process.env.JWT_ACCESS_KEY), { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, String(process.env.JWT_REFRESH_KEY), { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await Token.findOne({ where: { userId } })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({ userId, refreshToken })

        return token
    }

    async verifyAccessOrRefreshToken(token: string, key: string) {
        try {
            const userData = jwt.verify(token, key) as UserDto

            return userData
        } catch (error) {
            return null
        }
    }

    async verifyAccessToken(token: string) {
        return this.verifyAccessOrRefreshToken(token, String(process.env.JWT_ACCESS_KEY))
    }

    async verifyRefreshToken(token: string) {
        return this.verifyAccessOrRefreshToken(token, String(process.env.JWT_REFRESH_KEY))
    }

    async findToken(refreshToken: string) {
        const token = await Token.findOne({
            where: { refreshToken }
        })

        return token
    }

    async removeToken(refreshToken: string) {
        const token = await Token.destroy({
            where: { refreshToken }
        })
        
        return token
    }
}

export default new TokenService()
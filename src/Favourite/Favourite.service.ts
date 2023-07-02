import { Device } from "../../models/Device.model"
import { ApiError } from "../error/ApiError"
import TokenService from "../Token/Token.service"
import { FavouriteDevice } from "../../models/Favourite.model"

class FavouriteService {
    
    async create(token: string, id: string) {
        const userData = await TokenService.verifyRefreshToken(token)
        const device = await Device.findByPk(id)
        if (!device) throw ApiError.badRequest('Такого товара не существует')
        const favDevice = await FavouriteDevice.create({
            userId: userData?.id,
            deviceId: device?.id,
            name: device.name,
            img: device?.img,
            rating: device.rating,
        })
        
        return favDevice

    }

    async getAll(token: string) {
        const userData = await TokenService.verifyRefreshToken(token)
        const favDevices = await FavouriteDevice.findAll({
            where: {userId: userData?.id}
        })

        return favDevices
    }

    async deleteOne(token: string, deviceId: string) {
        const userData = await TokenService.verifyRefreshToken(token)
        const deletedFavDevice = await FavouriteDevice.destroy({
            where: {userId: userData?.id, deviceId}
        })

        return deletedFavDevice
    }
}

export default new FavouriteService()
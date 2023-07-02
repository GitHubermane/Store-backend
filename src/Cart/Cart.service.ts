import { Device } from "../../models/Device.model"
import { ApiError } from "../error/ApiError"
import TokenService from "../Token/Token.service"
import { UserDto } from "../User/User.dto"
import { Cart, CartDevice } from "../../models/Cart.model"

const findCartByTokenNDevice = async (token: string, deviceId: string): Promise<{ cart: Cart, device: Device }> => {
    const userData = await TokenService.verifyRefreshToken(token)
    const cart = await Cart.findOne({ where: { userId: userData?.id } }) as Cart
    const device = await Device.findByPk(deviceId) as Device
    if (!device) throw ApiError.badRequest('Такого товара не существует')

    return { cart, device }
}
export const findUserNCartByToken = async (token: string): Promise<{ userData: UserDto, cart: Cart }> => {
    const userData = await TokenService.verifyRefreshToken(token)
    if (!userData) throw ApiError.badRequest('Такого пользователя не существует')
    const cart = await Cart.findOne({ where: { userId: userData.id } }) as Cart

    return { userData, cart }

}

class CartService {
    async getCart(token: string) {
        const userData = await TokenService.verifyRefreshToken(token)
        const cart = await Cart.findOne({
            where: { userId: userData?.id },
            include: [{ model: CartDevice, as: 'devices' }]
        })

        return cart
    }

    async addToCart(token: string, id: string) {
        const { cart, device } = await findCartByTokenNDevice(token, id)
        const cartDevice = await CartDevice.create({
            cartId: cart?.id,
            deviceId: Number(id),
            quantity: 1,
            name: String(device?.name),
            price: Number(device?.price),
            img: String(device?.img)
        })
        cart.total = Number(cart.total) + Number(cartDevice.price)
        await cart.save()

        return cartDevice
    }

    async changeQuantity(token: string, deviceId: string, quantity: string) {
        const { cart, device } = await findCartByTokenNDevice(token, deviceId)
        const cartDevice = await CartDevice.findOne({
            where: { deviceId: device?.id, cartId: cart?.id }
        })
        if (!cartDevice) throw ApiError.badRequest('Такого товара нет в корзине')

        // cart.total -= cartDevice!.price * cartDevice!.quantity
        // cart.total += cartDevice!.price * cartDevice!.quantity
        cart.total += cartDevice!.price * (Number(quantity) - cartDevice!.quantity)

        cartDevice!.quantity = Number(quantity)
        await cartDevice?.save()
        await cart.save()

        return cartDevice
    }

    async deleteOne(token: string, deviceId: string) {
        const { cart } = await findUserNCartByToken(token)
        const cartDevice = await CartDevice.findOne({ where: { deviceId, cartId: cart?.id } })
        if (!cartDevice) throw ApiError.badRequest('Такого товара нет в корзине')
        cart!.total -= cartDevice!.price * cartDevice!.quantity
        
        await cart.save()
        const deletedCartDevice = await CartDevice.destroy({
            where: { cartId: cart?.id, deviceId }
        })

        return deletedCartDevice
    }

}

export default new CartService()
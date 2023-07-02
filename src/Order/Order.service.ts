import { CartDevice } from "../../models/Cart.model"
import { findUserNCartByToken } from "../Cart/Cart.service"
import { Order, OrderDevice } from "../../models/Order.model"

class OrderService {
    async create(token: string) {
        const { userData, cart } = await findUserNCartByToken(token)
        const order = await Order.create({
            userId: userData?.id,
            total: cart.total
        })
        const cartDevices = await CartDevice.findAll({
            where: { cartId: cart.id }
        })
        for (const device of cartDevices) {
            const orderDevice = await OrderDevice.create({
                orderId: order.id,
                deviceId: device.deviceId
            })
            console.log(orderDevice);
            
        }
        
        return order
    }
}


export default new OrderService()
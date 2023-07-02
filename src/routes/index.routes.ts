import { Router } from "express";
import UserRouter from "../User/User.routes"
import CartRouter from "../Cart/Cart.routes";
import DeviceRouter from "../Device/Device.routes";
import OrderRouter from "../Order/Order.routes";
import TypeRouter from "../Type/Type.routes";
import BrandRouter from "../Brand/Brand.routes";
import FavouriteRouter from "../Favourite/Favourite.routes";

const router = Router()

router.use('/user', UserRouter)
    .use('/cart', CartRouter)
    .use('/device', DeviceRouter)
    .use('/order', OrderRouter)
    .use('/type', TypeRouter)
    .use('/brand', BrandRouter)
    .use('/favourite', FavouriteRouter)


export default router
import { Router } from "express";
import { CartController } from "./Cart.controller";

const router = Router()

router.get('/', CartController.getCart)
router.post('/:id', CartController.addToCart)
    .put('/:id', CartController.changeQuantity)
    .delete('/:id', CartController.deleteOne)

export default router
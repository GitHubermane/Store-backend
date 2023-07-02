import { Router } from "express";
import { OrderController } from "./Order.controller";

const router = Router()

router.post('/', OrderController.create)


export default router
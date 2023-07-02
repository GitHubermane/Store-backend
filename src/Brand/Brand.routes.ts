import { Router } from "express";
import { BrandController } from "./Brand.controller";
import { CheckRoleMiddleware } from "../middleware/CheckRoleMiddleware";

const router = Router()

// router.post('/', CheckRoleMiddleware('ADMIN'), BrandController.create)
router.post('/', BrandController.create)
    .get('/', BrandController.getAll)


export default router
import { Router } from "express";
import { TypeController } from "./Type.controller";
import { CheckRoleMiddleware } from "../middleware/CheckRoleMiddleware";

const router = Router()

// router.post('/', CheckRoleMiddleware('ADMIN'), TypeController.create)
router.post('/', TypeController.create)
    .get('/', TypeController.getAll)

export default router
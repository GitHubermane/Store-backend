import { Router } from "express";
import { DeviceController } from "./Device.controller";
import { CheckRoleMiddleware } from "../middleware/CheckRoleMiddleware";

const router = Router()

router.post('/', DeviceController.create)
    .get('/', DeviceController.getAll)

router.get('/:id', DeviceController.getOne)
    .delete('/:id', CheckRoleMiddleware('ADMIN'), DeviceController.deleteOne)
    
router.delete('/deleteAll', CheckRoleMiddleware('ADMIN'), DeviceController.deleteAll)


export default router
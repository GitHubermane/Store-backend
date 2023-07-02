import { Router } from "express";
import { UserController } from "./User.controller";
import { body } from "express-validator";
import { CheckRoleMiddleware } from "../middleware/CheckRoleMiddleware";

const router = Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    UserController.registration
)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)
router.get('/', UserController.getAll)
router.get('/activate/:link', UserController.activate)
router.delete('/deleteAll', UserController.deleteAll)

export default router
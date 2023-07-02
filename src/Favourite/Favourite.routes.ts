import { Router } from "express";
import { FavouriteController } from "./Favourite.controller";

const router = Router()

router.get('/', FavouriteController.getAll)
router.post('/:id', FavouriteController.addOne)
    .delete('/:id', FavouriteController.deleteOne)

export default router
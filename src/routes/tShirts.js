import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import TshirtController from '../controller/tShirts.js'
const router = express.Router()
import UserGaurd from '../middleware/UserGaurd.js'

router.get('/',UserGaurd,TshirtController.getAllTshirt)
router.post('/',UserGaurd,TshirtController.createTshirt)
router.get('/:id',UserGaurd,TshirtController.getTshirtById)
router.put('/:id',UserGaurd,TshirtController.editDressById)
router.delete('/:id',UserGaurd,TshirtController.deleteDressById)

export default router
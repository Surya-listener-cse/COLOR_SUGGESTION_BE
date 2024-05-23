import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import TopsController from '../controller/tops.js'
const router = express.Router()
import UserGaurd from '../middleware/UserGaurd.js'

router.get('/',UserGaurd,TopsController.getAllTops)
router.post('/',UserGaurd,TopsController.createTops)
router.get('/:id',UserGaurd,TopsController.getTopsById)
router.put('/:id',UserGaurd,TopsController.editDressById)
router.delete('/:id',UserGaurd,TopsController.deleteDressById)

export default router
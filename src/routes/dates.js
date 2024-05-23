import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import DatesController from '../controller/dates.js'
const router = express.Router()
import UserGaurd from '../middleware/UserGaurd.js'

router.get('/',UserGaurd,DatesController.getAllDates)
router.post('/',UserGaurd,DatesController.createDate)
router.get('/:id',UserGaurd,DatesController.getDateById)
router.put('/:id',UserGaurd,DatesController.editDateById)
router.delete('/:id',UserGaurd,DatesController.deleteDateById)

export default router
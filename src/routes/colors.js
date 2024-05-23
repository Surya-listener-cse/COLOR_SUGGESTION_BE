import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import ColorController from '../controller/colors.js'
const router = express.Router()
import AdminGaurd from '../middleware/AdminGaurd.js'

router.get('/',ColorController.getAllColors)
router.post('/',AdminGaurd,ColorController.createColor)
router.get('/:id',ColorController.getColorById)
router.put('/:id',AdminGaurd,ColorController.editColorById)
router.delete('/:id',AdminGaurd,ColorController.deleteColorById)

export default router
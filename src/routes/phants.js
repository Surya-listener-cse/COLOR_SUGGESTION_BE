import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import PhantController from '../controller/phants.js'
const router = express.Router()
import UserGaurd from '../middleware/UserGaurd.js'

router.get('/',UserGaurd,PhantController.getAllPhants)
router.post('/',UserGaurd,PhantController.createPhant)
router.get('/:id',UserGaurd,PhantController.getPhantById)
router.put('/:id',UserGaurd,PhantController.editDressById)
router.delete('/:id',UserGaurd,PhantController.deleteDressById)

export default router
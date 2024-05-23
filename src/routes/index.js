import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()
import UserRoutes from './user.js'
import TopsRoutes from './tops.js'
import PhantsRoutes from './phants.js'
import ColorRoutes from './colors.js'
import TshirtRoutes from './tShirts.js'
import DatesRoutes from './dates.js'

router.use('/user',UserRoutes)
router.use('/tops',TopsRoutes)
router.use('/phants',PhantsRoutes)
router.use('/colors',ColorRoutes)
router.use('/tShirts',TshirtRoutes)
router.use('/dates',DatesRoutes)



export default router
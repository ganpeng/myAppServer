import express from 'express'
import co from 'co'

import userController from '../controllers/user'


const router = express.Router()


router.post('/', userController.createUser)
router.post('/vcode',userController.getVcode)

export default router

import {Router} from 'express'
import dataDestroyer from './user.routes/data.destroyer.router.js'
import dataChecker from './user.routes/existing.data.router.js'
import inputHandler from './user.routes/user.input.router.js'
const router = Router()
router.use('/destroy', dataDestroyer)
router.use('/check',dataChecker)
router.use('/input', inputHandler)
export default router

import {GetServerData} from "../../controller/user.controller.js"
<<<<<<< HEAD
import { CheckIfNodeIDExists } from "../../utils/data.validator.js"
=======
>>>>>>> 2ca889df7592232cf907d6a148cf95292cf74731
import {Router} from 'express'

const router = Router()

<<<<<<< HEAD
router.get("/:NodeID", CheckIfNodeIDExists,GetServerData)
=======
router.get("/:NodeID", GetServerData)
>>>>>>> 2ca889df7592232cf907d6a148cf95292cf74731
export default router
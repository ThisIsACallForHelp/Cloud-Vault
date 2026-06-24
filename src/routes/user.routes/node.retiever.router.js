import {GetServerData} from "../../controller/user.controller.js"
<<<<<<< HEAD
import {CheckIfNodeIDExists} from "../../utils/data.validator.js"
=======
>>>>>>> 5777d009640eb94c3b6f37f92e1782dc7f396496
import {Router} from 'express'


const router = Router()

router.get("/:NodeID", (req,res) => {
    return GetServerData(req,res);
})
export default router
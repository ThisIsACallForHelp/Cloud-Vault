import { Router } from "express";
import  { DeleteDataFromServer }  from "../../controller/user.controller.js" 
import { ValidateInput } from "../../utils/data.validator.js"

const router = Router();

router.get("/:NodeID", ValidateInput, (req,res) => {
    return await DeleteDataFromServer(req,res);
})

export default router;
import express  from "express";
const router=express.Router()
import {getAllLanguages,postLanguage} from '../../Controllers/Language.Controller.js'

router.get('/',getAllLanguages)
router.post('/',postLanguage)

export default router
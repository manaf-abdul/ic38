import express  from "express";
const router=express.Router()
import {getAllLanguages,postLanguage,editLanguage} from '../../Controllers/Language.Controller.js'

router.post('/edit',editLanguage)
router.get('/',getAllLanguages)
router.post('/',postLanguage)

export default router
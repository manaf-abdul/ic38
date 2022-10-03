import express from "express";
import {  postOneLiners,getOneLiners } from "../../Controllers/OneLiner.Controller.js";
const router=express.Router()
import {upload} from '../../Middlewares/Multer.js'


router.post('/',upload.single('file'),postOneLiners)
router.get('/:category/:language',getOneLiners)

export default router
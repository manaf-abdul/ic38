import express from "express";
import {  postOneLiners,getOneLiners, editOneLiner, deleteOneLiner} from "../../Controllers/OneLiner.Controller.js";
const router=express.Router()
import {upload} from '../../Middlewares/Multer.js'


router.post('/edit',editOneLiner)
router.post('/delete',deleteOneLiner)
router.post('/:category/:language',upload.single('file'),postOneLiners)
router.get('/:category/:language',getOneLiners)

export default router
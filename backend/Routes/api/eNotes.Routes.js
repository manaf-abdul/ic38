import express from "express";
import {  getOneLiners, editOneLiner, deleteOneLiner, addOneLiner} from "../../Controllers/ENotes.Controller.js";
const router=express.Router()


router.post('/edit',editOneLiner)
router.post('/delete',deleteOneLiner)
router.post('/add',addOneLiner)
// router.post('/:category/:language',upload.single('file'),postOneLiners)
router.get('/:category/:language',getOneLiners)

export default router
import express from 'express'
const router=express.Router()
import { postTerminology,getTerminologies, editTerminologies, deleteTerminologies,addTerminologies } from '../../Controllers/TerminologyController.js'
import {upload} from '../../Middlewares/Multer.js'

router.post('/edit',editTerminologies)
router.post('/delete',deleteTerminologies)
router.post('/add',addTerminologies)
router.post('/',upload.single('file'),postTerminology)
router.get('/:category/:language',getTerminologies)

export default router
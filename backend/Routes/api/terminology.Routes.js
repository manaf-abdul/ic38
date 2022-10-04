import express from 'express'
const router=express.Router()
import { postTerminology,getTerminologies, editTerminologies } from '../../Controllers/TerminologyController.js'
import {upload} from '../../Middlewares/Multer.js'

router.get('/edit',editTerminologies)
router.post('/',upload.single('file'),postTerminology)
router.get('/:category/:language',getTerminologies)

export default router
import express from 'express'
const router=express.Router()
import { postTerminology,getTerminologies } from '../../Controllers/TerminologyController.js'
import {upload} from '../../Middlewares/Multer.js'

router.post('/',upload.single('file'),postTerminology)
router.get('/',getTerminologies)

export default router
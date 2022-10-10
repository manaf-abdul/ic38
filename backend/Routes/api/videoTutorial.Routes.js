import express from 'express'
const router=express.Router()
import {upload} from '../../Middlewares/s3BucketMulter'
import { addVideoTutorial, deleteVideoTutorial, getVideoTutorial } from '../../Controllers/Video.Controller'

// router.post('/edit',editSuperCategory)
router.post('/delete',deleteVideoTutorial)
router.post('/',upload('file'),addVideoTutorial)
router.get('/',getVideoTutorial)

export default router
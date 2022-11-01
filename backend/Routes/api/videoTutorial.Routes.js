import express from 'express'
const router=express.Router()
import {s3UserStorage} from '../../Middlewares/s3BucketMulter.js'
import { addVideoTutorial, deleteVideoTutorial, getVideoTutorial } from '../../Controllers/Video.Controller.js'

// router.post('/edit',editSuperCategory)
router.post('/delete',deleteVideoTutorial)
router.post('/',s3UserStorage.single('file'),addVideoTutorial)
router.get('/:category',getVideoTutorial)

export default router
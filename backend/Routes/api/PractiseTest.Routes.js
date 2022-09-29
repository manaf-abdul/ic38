import express from 'express'
const router=express.Router()
import { postMockTest,getMockTest,getAllMockTests} from '../../Controllers/PractiseTest.Controller.js'
import {upload} from '../../Middlewares/Multer.js'

router.post('/',upload.single('file'),postMockTest)
router.get('/',getAllMockTests)
router.get('/:id',getMockTest)

export default router
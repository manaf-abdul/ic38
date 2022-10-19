import express from 'express'
const router=express.Router()
import {addSyllabus,deleteExamSyllabus,editSyllabus,getExamSyllabus} from '../../Controllers/ExamSyllabus.Controller.js'

router.get('/:category',getExamSyllabus)
router.post('/delete',deleteExamSyllabus)
router.post('/edit',editSyllabus)
router.post('/',addSyllabus)

export default router
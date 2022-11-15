import express from 'express'
const router=express.Router()
import {deleteQuestion,postWholeTest,getAllNumericalTest,editQuestion,postNumericalTest,postNewNumericalTest, editNumericalTest, deleteNumericalTest, getTestById, addNewQuestion, postMockTestResult} from '../../Controllers/MockTest.Controller.js'
import {upload} from '../../Middlewares/Multer.js'

router.post('/question/add',addNewQuestion)
router.post('/question/edit',editQuestion)
router.post('/question/delete',deleteQuestion)
router.post('/edit',editNumericalTest)
router.post('/delete',deleteNumericalTest)
router.post('/result',postMockTestResult)
router.post('/question-file',upload.single('file'),postNumericalTest)
router.post('/file',upload.single('file'),postWholeTest)
router.post('/test/:category/:language',getAllNumericalTest)
router.get('/:category/:language/:id',getTestById)
router.post('/:category/:language',postNewNumericalTest)

export default router
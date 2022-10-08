import express  from "express";
const router=express.Router()
import {deleteQuestion,postWholeTest,getAllNumericalTest,editQuestion,postNumericalTest,postNewNumericalTest, editNumericalTest, deleteNumericalTest, getTestById, addNewQuestion} from '../../Controllers/NumericalTest.Controller.js'
import { upload } from "../../Middlewares/Multer.js";


router.post('/question/add',addNewQuestion)
router.post('/question/edit',editQuestion)
router.post('/question/delete',deleteQuestion)
router.post('/edit',editNumericalTest)
router.post('/delete',deleteNumericalTest)
router.post('/question-file',upload.single('file'),postNumericalTest)
router.post('/file',upload.single('file'),postWholeTest)
router.get('/:category/:language/:id',getTestById)
router.get('/:category/:language',getAllNumericalTest)
router.post('/:category/:language',postNewNumericalTest)




export default router
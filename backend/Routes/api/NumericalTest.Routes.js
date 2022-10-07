import express  from "express";
const router=express.Router()
import {getAllNumericalTest,editQuestion,postNumericalTest,postNewNumericalTest, editNumericalTest, deleteNumericalTest, getTestById, addNewQuestion} from '../../Controllers/NumericalTest.Controller.js'


router.post('/question/add',addNewQuestion)
router.post('/question/edit',editQuestion)
router.get('/:category/:language/:id',getTestById)
router.get('/:category/:language',getAllNumericalTest)
router.post('/edit',editNumericalTest)
router.post('/delete',deleteNumericalTest)
router.post('/:category/:language',postNewNumericalTest)
// router.post('/',postNumericalTest)




export default router
import express  from "express";
const router=express.Router()
import {getAllNumericalTest,postNumericalTest,postSingleNumericalTest} from '../../Controllers/NumericalTest.Controller.js'

router.get('/:category/:language',getAllNumericalTest)
router.post('/add',postSingleNumericalTest)
router.post('/',postNumericalTest)

export default router
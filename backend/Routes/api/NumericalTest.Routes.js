import express  from "express";
const router=express.Router()
import {getAllNumericalTest,postNumericalTest} from '../../Controllers/NumericalTest.Controller.js'

router.get('/',getAllNumericalTest)
router.post('/',postNumericalTest)

export default router
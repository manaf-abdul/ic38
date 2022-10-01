import express from 'express'
const router=express.Router()
import { postSuperCategory,getSuperCategories } from '../../Controllers/SuperCategory.Controller.js'

router.post('/',postSuperCategory)
router.get('/',getSuperCategories)

export default router
import express from 'express'
const router=express.Router()
import { postSuperCategory,getSuperCategories, editSuperCategory } from '../../Controllers/SuperCategory.Controller.js'

router.post('/edit',editSuperCategory)
router.post('/',postSuperCategory)
router.get('/',getSuperCategories)

export default router
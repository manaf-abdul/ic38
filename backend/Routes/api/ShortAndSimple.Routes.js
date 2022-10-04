import express from 'express'
const router=express.Router()
import { getShortSimpleCategories,getShortSimpleByCategories,postShortSimpleCategories, editSASCat, deleteSASCat } from '../../Controllers/ShortAndSimple.Controller.js'

router.post('/edit',editSASCat)
router.post('/delete',deleteSASCat)
router.get('/add/:category/:language/:subCategory',getShortSimpleByCategories)
router.get('/:category/:language/:subCategory',getShortSimpleByCategories)
router.post('/:category/:language',postShortSimpleCategories)
router.get('/:category/:language',getShortSimpleCategories)


export default router
import express from 'express'
const router=express.Router()
import { getShortSimpleCategories,getShortSimpleByCategories,postShortSimpleCategories, editSASCat, deleteSASCat,addSAS, editSAS, deleteSAS, postSasByFile } from '../../Controllers/ShortAndSimple.Controller.js'
import { upload } from '../../Middlewares/Multer.js'

router.post('/data/edit',editSAS)
router.post('/data/delete',deleteSAS)
router.post('/add',addSAS)
router.post('/edit',editSASCat)
router.post('/delete',deleteSASCat)
router.get('/:category/:language/:subCategory',getShortSimpleByCategories)
router.post('/:category/:language',postShortSimpleCategories)
router.get('/:category/:language',getShortSimpleCategories)
router.post('/',upload.single('file'),postSasByFile)


export default router
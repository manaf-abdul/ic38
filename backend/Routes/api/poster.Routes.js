import express from 'express'
const router=express.Router()
import { addPosterImage,deletePoster,deletePosterImage,getPosters,postPosters} from '../../Controllers/Poster.Controller.js'
import { s3UserStorage } from '../../Middlewares/s3BucketMulter.js'

router.post('/delete',deletePoster)
router.post('/delete-image',deletePosterImage)
router.post('/add-image',s3UserStorage.single('file'),addPosterImage)
router.post('/',s3UserStorage.single('file'),postPosters)
router.get('/:language',getPosters)

export default router
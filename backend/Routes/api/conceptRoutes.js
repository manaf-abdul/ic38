import express from "express";
import { createConceptChapter, createConceptContent, getChapters, getConceptContentByChapter } from "../../Controllers/Concept.Controller.js";
const router=express.Router()


router.post('/content',createConceptContent)
router.post('/',createConceptChapter)
router.get('/:id',getConceptContentByChapter)
router.get('/',getChapters)

export default router
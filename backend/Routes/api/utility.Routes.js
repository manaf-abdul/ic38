import express from "express";
import {
  createConceptChapter,
  createConceptContent,
  getChapters,
  getConceptContentByChapter,
  editChapters,
  deleteChapters,
  deleteConceptsContent,
} from "../../Controllers/Concept.Controller.js";
const router = express.Router();

router.post("/question/delete", deleteConceptsContent);

router.post("/content", createConceptContent);
router.post("/:category/:language", createConceptChapter);
router.get("/:id", getConceptContentByChapter);
router.get("/:category/:language", getChapters);
router.post("/edit", editChapters);
router.post("/delete", deleteChapters);

export default router;

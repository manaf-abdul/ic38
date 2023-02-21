import express from "express";
import {
  createConceptChapter,
  createConceptContent,
  getChapters,
  getConceptContentByChapter,
} from "../../Controllers/Concept.Controller.js";
const router = express.Router();

router.post("/content", createConceptContent);
router.post("/:category/:language", createConceptChapter);
router.get("/:id", getConceptContentByChapter);
router.get("/:category/:language", getChapters);
// router.post("/update-chapter/:name", updateChapter);

export default router;

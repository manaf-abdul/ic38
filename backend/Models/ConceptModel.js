import mongoose from "mongoose";

const conceptSchema = mongoose.Schema(
  {
    language: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Language",
    },
    superCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SuperCategory",
    },
    chapterTitle: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  {
    timeStamps: true,
  }
);

const ConceptChapter = mongoose.model("ConceptChapter", conceptSchema);
export default ConceptChapter;

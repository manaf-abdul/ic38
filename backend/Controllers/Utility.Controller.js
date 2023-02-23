import ConceptContent from "../Models/ConceptContentModel.js";
import ConceptChapter from "../Models/ConceptModel.js";

export const createConceptChapter = async (req, res) => {
  try {
    const { language, category } = req.params;
    const { chapterTitle } = req.body;
    console.log(`-- concepts, ${chapterTitle}`, language, category);
    let concept = await ConceptChapter.findOne({ slug: slugify(chapterTitle) });
    if (concept)
      return res.status(200).json({
        errorcode: 3,
        status: false,
        msg: "Chapter Name is already Used",
        data: null,
      });
    let newChapterTitle = new ConceptChapter({
      language,
      superCategory: category,
      chapterTitle,
      slug: slugify(chapterTitle),
    });
    newChapterTitle = await newChapterTitle.save();
    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "Title Created Succesffully.",
      data: newChapterTitle,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(200)
      .json({ errorcode: 5, status: false, msg: e.message, data: e });
  }
};

export const createConceptContent = async (req, res) => {
  try {
    const { title, content, conceptChapterId } = req.body;
    let newContent = new ConceptContent({
      title,
      content,
      chapterId: conceptChapterId,
    });
    newContent = await newContent.save();
    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "Content Created Succesffully.",
      data: newContent,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(200)
      .json({ errorcode: 5, status: false, msg: e.message, data: e });
  }
};

export const getConceptContentByChapter = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);x
    let data = await ConceptContent.find({ chapterId: id });
    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "Concept Content Found",
      data: data,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(200)
      .json({ errorcode: 5, status: false, msg: e.message, data: e });
  }
};

export const getChapters = async (req, res) => {
  try {
    const { language, category } = req.params;
    let data = await ConceptChapter.find({ language, superCategory: category });
    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "Concept Chapter Found",
      data: data,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(200)
      .json({ errorcode: 5, status: false, msg: e.message, data: e });
  }
};
export const editChapters = async (req, res) => {
  try {
    const { name, _id } = req.body;
    console.log(name, _id);
    if (!_id)
      return res.status(200).json({
        errorcode: 1,
        status: false,
        msg: "Id is required",
        data: null,
      });
    let chapter = await ConceptChapter.findById(_id);
    if (!chapter)
      return res.status(200).json({
        errorcode: 2,
        status: false,
        msg: "Chapter not found",
        data: null,
      });

    let chapterEx = await ConceptChapter.findOne({ chapterTitle: name });
    // console.log(chapterEx);
    if (chapterEx)
      return res.status(200).json({
        errorcode: 3,
        status: false,
        msg: "Name is in use",
        data: null,
      });
    chapter.chapterTitle = name ? name : chapter.chapterTitle;
    console.log("====", chapter);
    chapter = await chapter.save();
    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "Chapter Updated Successfully",
      data: chapter,
    });
  } catch (error) {
    return res
      .status(200)
      .json({ errorcode: 5, status: false, msg: error.message, data: error });
  }
};
export const deleteChapters = async (req, res) => {
  console.log("============DELETE Chapter===========");
  try {
    // const {category,language}=req.params
    const { name, _id, language, category } = req.body;
    console.log("req.body", req.body);
    let chapter = await ConceptChapter.findOne({
      language: language,
      superCategory: category,
      _id: _id,
    });
    if (!chapter)
      return res.status(200).json({
        errorcode: 1,
        status: false,
        msg: "Chapter Not Found",
        data: null,
      });
    await ConceptChapter.deleteOne({
      language: language,
      superCategory: category,
      _id: _id,
    });
    try {
      const { _id, title, content } = req.body;
      console.log("req.body", req.body);

      // let numTest = await NumericalTest.findOne({ _id: _id })
      let getContent = await ConceptContent.findOne({
        chapterId: _id,
      });
      if (!getContent)
        return res.status(200).json({
          errorcode: 1,
          status: false,
          msg: "Content Not Found",
          data: null,
        });
      await ConceptContent.deleteOne({
        chapterId: _id,
      });
      return res.status(200).json({
        errorcode: 0,
        status: true,
        msg: "Content Deleted Successfully",
        data: null,
      });
    } catch (e) {
      console.log(e);
      return res
        .status(200)
        .json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "Chapter  Deleted Successfully",
      data: null,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(200)
      .json({ errorcode: 5, status: false, msg: e.message, data: e });
  }
};
export const deleteConceptsContent = async (req, res) => {
  console.log("============deleteConceptsContent===========");
  try {
    const { _id, title, content } = req.body;
    console.log("req.body", req.body);

    // let numTest = await NumericalTest.findOne({ _id: _id })
    let getContent = await ConceptContent.findOne({
      title: title,
      content: content,
      _id: _id,
    });
    if (!getContent)
      return res.status(200).json({
        errorcode: 1,
        status: false,
        msg: "Content Not Found",
        data: null,
      });
    await ConceptContent.deleteOne({
      title: title,
      content: content,
      _id: _id,
    });
    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "Content Deleted Successfully",
      data: null,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(200)
      .json({ errorcode: 5, status: false, msg: e.message, data: e });
  }
};

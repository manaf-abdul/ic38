import slugify from 'slugify'
import ConceptContent from '../Models/ConceptContentModel.js';
import ConceptChapter from '../Models/ConceptModel.js';

export const createConceptChapter=async(req,res)=>{
    try {
        const {chapterTitle}=req.body;
        let concept=await ConceptChapter.findOne({slug:slugify(chapterTitle)})
        if (concept) return res.status(200).json({ errorcode: 3, status: false, msg: "Chapter Name is already Used", data: null })
        let newChapterTitle=new ConceptChapter({
            chapterTitle,
            slug:slugify(chapterTitle)
        })
        newChapterTitle=await newChapterTitle.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Title Created Succesffully.", data: newChapterTitle });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const createConceptContent=async(req,res)=>{
    try {
        const {title,content,conceptChapterId}=req.body;
        let newContent=new ConceptContent({
            title,content,chapterId:conceptChapterId
        })
        newContent=await newContent.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Content Created Succesffully.", data: newContent });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getConceptContentByChapter=async(req,res)=>{
    try {
        const {id}=req.params;
        let data=await ConceptContent.find({chapterId:id})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Content Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}


export const getChapters=async(req,res)=>{
    try {
        let data=await ConceptChapter.find({})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
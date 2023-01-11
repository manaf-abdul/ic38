import ExamSyllabus from "../Models/ExamSyllabus.Model.js";

export const addSyllabus=async(req,res)=>{
    console.log(req.body,req.file)
    try {
        const {title,content,superCategory}=req.body
        if(!title || !content || !superCategory)  return res.status(200).json({ errorcode: 1, status: false, msg: "Name,content and categories is required", data: null });
        let newCat=new ExamSyllabus({
            title,
            content,
            superCategory
        })
        newCat=await newCat.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Exam Syllabus Added Success", data: newCat });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const editSyllabus=async(req,res)=>{
    console.log(req.body,req.file)
    try {
        const {title,content,superCategory,_id}=req.body
        if(!title || !content || !superCategory || !_id)  return res.status(200).json({ errorcode: 1, status: false, msg: "Name,content and categories is required", data: null });
        let examSyllabus=await ExamSyllabus.findOne({_id:_id})
        if(!examSyllabus)  return res.status(200).json({ errorcode: 1, status: false, msg: "Exam Syllabus Not Found", data: null });
        examSyllabus.title=title?title:examSyllabus.title;
        examSyllabus.content=content?content:examSyllabus.content
        examSyllabus=await examSyllabus.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Exam Syllabus Added Success", data: examSyllabus });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const deleteExamSyllabus=async(req,res)=>{

    try {
        const {_id}=req.body
        if(!_id) return res.status(200).json({ errorcode: 1, status: false, msg: "Name & ID is required", data: null })
        let category=await ExamSyllabus.findById(_id)
        if(!category)  return res.status(200).json({ errorcode: 1, status: false, msg: "Exam Syllabus not Found", data: null });
        await ExamSyllabus.deleteOne({_id:_id})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Exam Syllabus Deleted Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e.message });
    }
}

export const getExamSyllabus=async(req,res)=>{
    try {
        const {category}=req.params;
        let data=await ExamSyllabus.find({superCategory:category})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Exam Syllabus Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e.message });
    }
}
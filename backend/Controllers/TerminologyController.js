import Terminology from "../Models/TerminologyModel.js"
import { fileParser } from "../utils/fileParser.js"

export const postTerminology=async(req,res)=>{
    try {
        if(!req.file) return res.status({errorcode:1,status:false,msg:"File is required",data:null})
        const {language,superCategory,isDelete}=req.body
        console.log(req.body)
        if(isDelete) await Terminology.deleteMany({})
        let data = fileParser(req.file.buffer)
        data=data[0].data.map(x=>{
            return{
                ...x,
                language:language,
                superCategory:superCategory
            }
        })
        console.log("dataaaaaa",data)
        data=await Terminology.create(data)
        return res.status(200).json({ errorcode: 0, status: true, msg: "terminologies Added Successfully", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getTerminologies=async(req,res)=>{
    console.log("---------getTerminologies--------------");
    try {
        const {category,language}=req.params
        if(!category || !language)  return res.status(200).json({ errorcode: 1, status: false, msg: "Category & Language should be present", data: null })
        let data=await Terminology.find({language:language,superCategory:category}).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        return res.status(200).json({ errorcode: 0, status: true, msg: "Terminology Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const editTerminologies=async(req,res)=>{
    try {
        const {language,superCategory,description,title,_id}=req.body
        let term=await Terminology.findOne({_id:_id})
        if(!term) return res.status(200).json({ errorcode: 1, status: false, msg: "Terminology not  Found", data: data });
        term.title=title?title:term.title
        term.description=description?description:term.description
        term=await term.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "terminology updated Successfully", data: term });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const deleteTerminologies = async (req, res) => {
    console.log("============deleteTerminologies===========");
    console.log("req.body",req.body);
    try {
        const {description,title,_id,language,superCategory}=req.body
        let terminology = await Terminology.findById({_id:_id})
        if(!terminology)  return res.status(200).json({ errorcode: 1, status: false, msg: "One-Liner Not Found", data: null })
        await Terminology.deleteOne({_id:_id})
        return res.status(200).json({ errorcode: 0, status: true, msg: "One-Liner Deleted Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const addTerminologies = async (req, res) => {
    console.log("============addTerminologies===========");
    try {
        const {title,description,language,category}=req.body
        let terminology=new Terminology({
            title, 
            description,
            language:language ,
            superCategory: category
        })
        terminology=await terminology.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Terminology Created Successfully", data: terminology });
    } catch (e) {
        // console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
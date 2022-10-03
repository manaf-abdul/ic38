import Terminology from "../Models/TerminologyModel.js"
import { fileParser } from "../utils/fileParser.js"

export const postTerminology=async(req,res)=>{
    try {
        if(!req.file) return res.status({errorcode:1,status:false,msg:"File is required",data:null})
        const {language,superCategory}=req.body
        console.log(req.body)
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
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getTerminologies=async(req,res)=>{
    try {
        const {category,language}=req.params
        if(!category || !language)  return res.status(200).json({ errorcode: 1, status: false, msg: "Category & Language should be present", data: null })
        let data=await Terminology.find({language:language,superCategory:category}).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
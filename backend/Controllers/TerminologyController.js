import Terminology from "../Models/TerminologyModel.js"
import { fileParser } from "../utils/fileParser.js"

export const postTerminology=async(req,res)=>{
    try {
        if(!req.file) return res.status({errorcode:1,status:false,msg:"File is required",data:null})
        const data = fileParser(req.file.buffer)
        let newTerminologies=await Terminology.create(data[0].data)
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: newTerminologies });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getTerminologies=async(req,res)=>{
    try {
        let data=await Terminology.find({}).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
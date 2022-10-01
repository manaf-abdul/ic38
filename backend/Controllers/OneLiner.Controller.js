import OneLiner from "../Models/OneLiner.models.js";
import { fileParser } from "../utils/fileParser.js";

export const postOneLiners=async(req,res)=>{
    try {
        if(!req.file) return res.status(200).json({errorcode:0,status:false,msg:"File not present",data:null})    
        const fileData=fileParser(req.file.buffer)
        let newOneLiners=await OneLiner.create(fileData[0].data)
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: newOneLiners });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getOneLiners=async(req,res)=>{
    try {
        let data=await OneLiner.find({})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
import LanguageModel from "../Models/Language.Model.js";

export const getAllLanguages=async(req,res)=>{
    try {
        let data=await LanguageModel.find({})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const postLanguage=async(req,res)=>{
    try {
        const {name}=req.body
        let data=await LanguageModel.findOne({name:name})
        if(data) return res.status(200).json({ errorcode: 0, status: true, msg: "Language Name Already Present", data: null });
        let newLanguage=new LanguageModel({name})
        newLanguage=await newLanguage.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: newLanguage });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
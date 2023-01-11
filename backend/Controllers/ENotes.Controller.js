import mongoose from "mongoose";
import OneLiner from "../Models/ENotes.Model.js";

// export const postOneLiners = async (req, res) => {
//     try {
//         await OneLiner.deleteMany()
//         const {category,language}=req.params
//         const{isDelete}=req.body
//         console.log("req.body", req.body.language)
//         console.log("req.file", req.file)
//         if (!req.file) return res.status(200).json({ errorcode: 0, status: false, msg: "File not present", data: null })
//         if(isDelete) await OneLiner.deleteMany()
//         const fileData = fileParser(req.file.buffer)
//         if (!fileData) return res.status(200).json({ errorcode: 0, status: false, msg: "Error Reading your file", data: null })
//         let data = fileData[0].data.map(x => {
//             return {
//                 ...x,
//                 language:language ,
//                 superCategory: category
//             }
//         })
//         console.log("data",data)
//         let newOneLiners = await OneLiner.create(data)
//         return res.status(200).json({ errorcode: 0, status: true, msg: "OneLiner Updated Successfully", data: newOneLiners });
//     } catch (e) {
//         // console.log(e)
//         return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
//     }
// }

export const addOneLiner = async (req, res) => {
    console.log("HEREEEE",req.body)
    console.log(req.params)
    console.log("============ADD oneliner===========");
    try {
        const {language,category}=req.body;
        const {content,title}=req.body
        let newOneLIner=new OneLiner({
            content, 
            language:language ,
            superCategory:category,
            title
        })
        newOneLIner=await newOneLIner.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "E-Notes Created Successfully", data: newOneLIner });
    } catch (e) {
        // console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getOneLiners = async (req, res) => {
    try {
        const {category,language}=req.params
        if(!category || !language)  return res.status(200).json({ errorcode: 1, status: false, msg: "Category & Language should be present", data: null })
        let data = await OneLiner.find({language:language,superCategory:category})
        return res.status(200).json({ errorcode: 0, status: true, msg: "E-Notes Chapter Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const editOneLiner = async (req, res) => {
    console.log("============EDIT oneliner===========");
    console.log("req.body",req.body);
    try {
        // const {category,language}=req.params
        const {content,id,language,category,title}=req.body
        // if(!category || !language)  return res.status(200).json({ errorcode: 1, status: false, msg: "Category & Language should be present", data: null })
        let oneLiner = await OneLiner.findOne({_id:id})
        if(!oneLiner)  return res.status(200).json({ errorcode: 1, status: false, msg: "E-Notes Not Found", data: null })
        oneLiner.content=content?content:oneLiner.content;
        oneLiner.title=title?title:oneLiner.title;
        oneLiner.superCategory=oneLiner.superCategory;
        oneLiner.language=oneLiner.language;
        oneLiner=await oneLiner.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "E-Notes Updated Successfully", data: oneLiner });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const deleteOneLiner = async (req, res) => {
    console.log("============DELETE oneliner===========");
    console.log("req.body",req.body);
    try {
        // const {category,language}=req.params
        const {content,_id,language,category}=req.body
        // if(!category || !language)  return res.status(200).json({ errorcode: 1, status: false, msg: "Category & Language should be present", data: null })
        let oneLiner = await OneLiner.findOne({_id:_id})
        console.log("oneLiner",oneLiner);
        if(!oneLiner)  return res.status(200).json({ errorcode: 1, status: false, msg: "E-Notes Not Found", data: null })
        await OneLiner.deleteOne({_id:_id})
        return res.status(200).json({ errorcode: 0, status: true, msg: "E-Notes Deleted Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
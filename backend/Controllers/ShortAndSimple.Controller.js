import ShortAndSimple from '../Models/ShortAndSimple.Model.js'
import SasCategory from '../Models/ShortSimpleCategory.js'
import { fileParser } from '../utils/fileParser.js';

export const getShortSimpleCategories=async(req,res)=>{
    console.log("HERE");
    try {
        let data=await SasCategory.find({})
       return res.status(200).json({ errorcode: 0, status: true, msg: "S&S CAtegories Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const postShortSimpleCategories=async(req,res)=>{
    console.log("```````postShortSimpleCategories``````")
    try {
        const {category,language}=req.params;
        const {name}=req.body;
        let newSasCat=new SasCategory({
            name,superCategory:category,language
        })
        newSasCat=newSasCat.save()
       return res.status(200).json({ errorcode: 0, status: true, msg: "Categories Created Successfully", data: newSasCat });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const editSASCat = async (req, res) => {
    console.log("============EDIT editSASCat===========");
    console.log("req.body",req.body);
    try {
        // const {category,language}=req.params
        const {name,_id,language,subCategory,superCategory}=req.body
        // if(!superCategory || !language)  return res.status(200).json({ errorcode: 1, status: false, msg: "Category & Language should be present", data: null })
        let SASCat = await SasCategory.findOne({_id:_id})
        if(!SASCat)  return res.status(200).json({ errorcode: 1, status: false, msg: "S&S Category Not Found", data: null })
        SASCat.name=name?name:SASCat.name
        SASCat=await SASCat.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "S&S Category Updated Successfully", data: SASCat });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const deleteSASCat = async (req, res) => {
    console.log("============DELETE deleteSASCat===========");
    console.log("req.body",req.body);
    try {
        // const {category,language}=req.params
        const {name,_id,language,category}=req.body
        if(!category || !language)  return res.status(200).json({ errorcode: 1, status: false, msg: "Category & Language should be present", data: null })
        let SASCat = await SasCategory.findOne({language:language,superCategory:category,_id:_id})
        if(!SASCat)  return res.status(200).json({ errorcode: 1, status: false, msg: "One-Liner Not Found", data: null })
        await SasCategory.deleteOne({language:language,superCategory:category,_id:_id})
        return res.status(200).json({ errorcode: 0, status: true, msg: "S&S Category Deleted Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getShortSimpleByCategories=async(req,res)=>{
    console.log("INSIDE    getShortSimpleByCategories ")
    try {
        const {category,language,subCategory}=req.params
        let data=await ShortAndSimple.find({subCategory:subCategory,superCategory:category,language:language})
       return res.status(200).json({ errorcode: 0, status: true, msg: "Short and Simple Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const addSAS=async(req,res)=>{
    console.log("INSIDE    addSAS ")
    try {
        const {title,description,category,language,subCategory}=req.body
        let sAs=new ShortAndSimple({
            title,description,superCategory:category,language,subCategory
        })
        sAs=await sAs.save()
       return res.status(200).json({ errorcode: 0, status: true, msg: "Short And Simple Added Successfullly", data: sAs });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const editSAS=async(req,res)=>{
    console.log("============editSAS===========");
    console.log("req.body",req.body);
    try {
        const {description,language,subCategory,superCategory,title,_id}=req.body
        let sas=await ShortAndSimple.findOne({_id:_id})
        if(!sas) return res.status(200).json({ errorcode: 1, status: false, msg: "Short & Simple not  Found", data: data });
        sas.title=title?title:sas.title
        sas.description=description?description:sas.description
        sas=await sas.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Short & Simple updated Successfully", data: sas });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const deleteSAS = async (req, res) => {
    console.log("============deleteTerminologies===========");
    console.log("req.body",req.body);
    try {
        const {description,language,subCategory,superCategory,title,_id}=req.body
        let sas = await ShortAndSimple.findById(_id)
        if(!sas)  return res.status(200).json({ errorcode: 1, status: false, msg: "Short & Simple Not Found", data: null })
        await ShortAndSimple.deleteOne({_id:_id})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Short & Simple Deleted Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const postSasByFile=async(req,res)=>{
    console.log("-----postSasByFile-----")
    console.log(req.file)
    console.log(req.body)
    try {
        if(!req.file) return res.status({errorcode:1,status:false,msg:"File is required",data:null})
        const {language,subCategory,superCategory,isDelete}=req.body
        // if(isDelete) await ShortAndSimple.deleteMany({})
        console.log(req.body)
        let data = fileParser(req.file.buffer)
        data=data[0].data.map(x=>{
            return{
                ...x,
                language:language,
                superCategory:superCategory,
                subCategory:subCategory
            }
        })
        console.log("dataaaaaa",data)
        data=await ShortAndSimple.create(data)
        return res.status(200).json({ errorcode: 0, status: true, msg: "Short & Simple Added Successfully", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
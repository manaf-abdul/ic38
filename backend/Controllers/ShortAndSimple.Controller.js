import ShortAndSimple from '../Models/ShortAndSimple.Model.js'
import SasCategory from '../Models/ShortSimpleCategory.js'

export const getShortSimpleCategories=async(req,res)=>{
    console.log("HERE");
    try {
        let data=await SasCategory.find({})
       return res.status(200).json({ errorcode: 0, status: true, msg: "Terminology Found", data: data });
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
        const {name,_id,language,category}=req.body
        if(!category || !language)  return res.status(200).json({ errorcode: 1, status: false, msg: "Category & Language should be present", data: null })
        let SASCat = await SasCategory.findOne({language:language,superCategory:category,_id:_id})
        if(!SASCat)  return res.status(200).json({ errorcode: 1, status: false, msg: "Pne-Liner Not Found", data: null })
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
       return res.status(200).json({ errorcode: 0, status: true, msg: "Terminology Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
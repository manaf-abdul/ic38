import Poster from "../Models/Posters.Model.js";

export const postPosters=async(req,res)=>{
    console.log("postPosters")
    try {
        const {title,language}=req.body
        if(!title)  return res.status(200).json({ errorcode: 1, status: false, msg: "Name is required", data: null });
        let newCat=new Poster({
            title,
            file:req.file ? req.file :null,
            language
        })
        newCat=await newCat.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Poster Added Success", data: newCat });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const deletePoster=async(req,res)=>{

    try {
        const {_id}=req.body
        if(!_id) return res.status(200).json({ errorcode: 1, status: false, msg: " ID is required", data: null })
        let category=await Poster.findById(_id)
        if(!category)  return res.status(200).json({ errorcode: 1, status: false, msg: "Poster not Found", data: null });
        await Poster.deleteOne({_id:_id})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Poster Deleted Successfully", data: category });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getPosters=async(req,res)=>{
    try {
        const {language}=req.params;
        let data=await Poster.find({language:language})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Posters Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const addPosterImage=async(req,res)=>{
    console.log("addPosterImage",req.body)
    try {
        const {id}=req.body
        if(!id || !req.file) return res.status(200).json({ errorcode: 1, status: false, msg: "ID & File is required", data: null })
        let data=await Poster.findById(id)
        if(!data) return res.status(200).json({ errorcode: 1, status: false, msg: "Poster not found", data: null })
        await Poster.updateOne({_id:id},{$push:{file:req.file}})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Languages Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const deletePosterImage=async(req,res)=>{
    console.log("deletePosterImage",req.body)
    try {
        const {id,key}=req.body
        if(!id || !key) return res.status(200).json({ errorcode: 1, status: false, msg: "ID & picId is required", data: null })
        let data=await Poster.findById(id)
        if(!data) return res.status(200).json({ errorcode: 1, status: false, msg: "Poster not found", data: null })
        await Poster.updateOne({_id:id},{$pull:{file:{key:key}}})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Languages Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
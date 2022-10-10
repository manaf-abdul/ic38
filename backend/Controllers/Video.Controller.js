import SuperCategory from "../Models/SuperCategory.Model.js";

export const addVideoTutorial=async(req,res)=>{
    try {
        const {name}=req.body
        if(!name || !req.file)  return res.status(200).json({ errorcode: 1, status: false, msg: "Name is required", data: null });
        let newCat=new SuperCategory({
            name:name,
            file:req.file?req.file:null
        })
        newCat=await newCat.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Video Added Success", data: newCat });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const deleteVideoTutorial=async(req,res)=>{

    try {
        const {_id}=req.body
        if(!_id) return res.status(200).json({ errorcode: 1, status: false, msg: "Name & ID is required", data: null })
        let category=await SuperCategory.findById(_id)
        if(!category)  return res.status(200).json({ errorcode: 1, status: false, msg: "Video not Found", data: null });
        await SuperCategory.deleteOne({_id:_id})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Video Deleted Successfully", data: category });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getVideoTutorial=async(req,res)=>{
    try {
        let data=await SuperCategory.find({})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Video Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
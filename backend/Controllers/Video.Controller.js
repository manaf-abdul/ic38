import VideoTutorials from "../Models/videoTutorial.Model.js";

export const addVideoTutorial=async(req,res)=>{
    console.log(req.body,req.file)
    try {
        const {name,category,url}=req.body
        if(!name || (!req.file && !url) || !category)  return res.status(200).json({ errorcode: 1, status: false, msg: "Name,file & Category is required", data: null });
        let newCat=new VideoTutorials({
            name:name,
            file:req.file?req.file:null,
            category,
            url
        })
        newCat=await newCat.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Video Added Success", data: newCat });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data:null });
    }
}

export const deleteVideoTutorial=async(req,res)=>{

    try {
        const {_id}=req.body
        if(!_id) return res.status(200).json({ errorcode: 1, status: false, msg: "Name & ID is required", data: null })
        let category=await VideoTutorials.findById(_id)
        if(!category)  return res.status(200).json({ errorcode: 1, status: false, msg: "Video not Found", data: null });
        await VideoTutorials.deleteOne({_id:_id})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Video Deleted Successfully", data: category });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getVideoTutorial=async(req,res)=>{
    try {
        const {category}=req.params;
        let data=await VideoTutorials.find({category:category})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Video Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
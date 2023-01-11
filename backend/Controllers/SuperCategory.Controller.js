import SuperCategory from "../Models/SuperCategory.Model.js";

export const postSuperCategory=async(req,res)=>{
    try {
        const {name}=req.body
        if(!name)  return res.status(200).json({ errorcode: 1, status: false, msg: "Name is required", data: null });
        let newCat=new SuperCategory({name})
        newCat=await newCat.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Language Added Success", data: newCat });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const editSuperCategory=async(req,res)=>{

    try {
        const {_id,content}=req.body
        if(!content || !_id) return res.status(200).json({ errorcode: 1, status: false, msg: "Name & ID is required", data: null })
        let category=await SuperCategory.findById(_id)
        if(!category)  return res.status(200).json({ errorcode: 1, status: false, msg: "Category not Found", data: null });
        category.name=content?content:category.name
        category=await category.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "LAnguage Updated Successfully", data: category });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getSuperCategories=async(req,res)=>{
    try {
        let data=await SuperCategory.find({})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Languages Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
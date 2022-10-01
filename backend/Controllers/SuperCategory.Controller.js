import SuperCategory from "../Models/SuperCategory.Model.js";

export const postSuperCategory=async(req,res)=>{
    try {
        const {name}=req.body
        if(!name)  return res.status(200).json({ errorcode: 1, status: false, msg: "Name is required", data: null });
        let newCat=new SuperCategory({name})
        newCat=await newCat.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: newCat });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getSuperCategories=async(req,res)=>{
    try {
        let data=await SuperCategory.find({})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
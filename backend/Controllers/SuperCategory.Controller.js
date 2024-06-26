import ENote from "../Models/ENotes.Model.js";
import ExamSyllabus from "../Models/ExamSyllabus.Model.js";
import LiveTest from "../Models/LiveTest.Model.js";
import LiveTestSet from "../Models/LiveTestCollection.Model.js";
import MockTest from "../Models/MockTest.Model.js";
import NumericalTest from "../Models/NumericalTest.Model.js";
import OneLiner from "../Models/OneLiner.models.js";
import PractiseTest from "../Models/PractiseTest.model.js";
import ShortAndSimple from "../Models/ShortAndSimple.Model.js";
import ShortSimpleCategory from "../Models/ShortSimpleCategory.js";
import SuperCategory from "../Models/SuperCategory.Model.js";
import terminology from "../Models/TerminologyModel.js";
import VideoTutorials from "../Models/videoTutorial.Model.js";

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

export const deleteSuperCategory=async(req,res)=>{
    try {
        const {_id}=req.body
        if(!_id) return res.status(200).json({ errorcode: 1, status: false, msg: "Name & ID is required", data: null })
        let category=await SuperCategory.findById(_id)
        if(!category)  return res.status(200).json({ errorcode: 1, status: false, msg: "Category not Found", data: null });
        await SuperCategory.deleteMany({_id:_id})
        await ENote.deleteMany({superCategory:_id})
        await ExamSyllabus.deleteMany({superCategory:_id})
        await LiveTest.deleteMany({superCategory:_id})
        await LiveTestSet.deleteMany({superCategory:_id})     
        await MockTest.deleteMany({superCategory:_id})
        await NumericalTest.deleteMany({superCategory:_id})
        await OneLiner.deleteMany({superCategory:_id})
        await PractiseTest.deleteMany({superCategory:_id})
        await ShortAndSimple.deleteMany({superCategory:_id})
        await ShortSimpleCategory.deleteMany({superCategory:_id})
        await terminology.deleteMany({superCategory:_id})
        await VideoTutorials.deleteMany({category:_id})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Category Deleted Successfully", data: category });
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
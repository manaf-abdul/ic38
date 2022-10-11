import NumericalTest from "../Models/NumericalTest.Model.js";
import { fileParser } from "../utils/fileParser.js";
import slugify from "slugify";
import mongoose from 'mongoose'

export const postNumericalTest = async (req, res) => {
    console.log("here postNumericalTest",req.body)
    // await NumericalTest.deleteMany()
    try {
        if (!req.file) return res.status(200).json({ errorcode: 1, status: false, msg: "File Not Present", data: null })
        const { category, language,id,isDelete } = req.body;
        let test = await NumericalTest.findOne({_id:id})
        if (!test) return res.status(200).json({ errorcode: 2, status: false, msg: "No Num-Test found", data: null })
        const data = fileParser(req.file.buffer)
        console.log("data", data)
        // let newPost = new NumericalTest({
        //     name,
        //     slug: slugify(name),
        //     superCategory: category,
        //     language: language,
        //     numberOfQes: data[0].data.length,
        //     description,
        //     qAndA: data[0].data
        // })
        if(isDelete)  {await NumericalTest.updateOne({_id:id},{$set:{qAndA:data[0].data}})}
        else{await NumericalTest.updateOne({_id:id},{$push:{qAndA:{$each:data[0].data}}})}
        return res.status(200).json({ errorcode: 0, status: true, msg: "Created Successfully", data: data })
    } catch (error) {
        return res.status(200).json({ errorcode: 5, status: false, msg: error.message, data: error });
    }
}

export const postWholeTest = async (req, res) => {
    console.log("here postWholeTest",req.body)
    try {
        if (!req.file) return res.status(200).json({ errorcode: 1, status: false, msg: "File Not Present", data: null })
        const { superCategory, language,id,name } = req.body;
        let ex = await NumericalTest.findOne({ slug: slugify(name) })
        if (ex) return res.status(200).json({ errorcode: 2, status: false, msg: "Name Already Present", data: null })
       const data = fileParser(req.file.buffer)
        console.log("data", data)
        let newPost = new NumericalTest({
            name,
            slug: slugify(name),
            superCategory: superCategory,
            language: language,
            numberOfQes: data[0].data.length,
            qAndA: data[0].data
        })
        newPost = await newPost.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Created Successfully", data: data })
    } catch (error) {
        return res.status(200).json({ errorcode: 5, status: false, msg: error.message, data: error });
    }
}
// export const getNumericalTest = async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (!id) return res.status(200).json({ errorcode: 0, status: false, msg: "Id is required", data: null })
//         let data = await NumericalTest.findById(id)
//         return res.status(200).json({ errorcode: 0, status: true, msg: "practise test found ", data: data })
//     } catch (error) {
//         return res.status(200).json({ errorcode: 5, status: false, msg: error.message, data: error });
//     }
// }

export const getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(200).json({ errorcode: 0, status: false, msg: "Id is required", data: null })
        let data = await NumericalTest.findById(id)
        return res.status(200).json({ errorcode: 0, status: true, msg: "practise test found ", data: data })
    } catch (error) {
        return res.status(200).json({ errorcode: 5, status: false, msg: error.message, data: error });
    }
}

export const getAllNumericalTest = async (req, res) => {
    console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
    try {
        const { category, language } = req.params;
        let data = await NumericalTest.find({ superCategory: category, language: language })
        return res.status(200).json({ errorcode: 0, status: true, msg: "NUmerical test found ", data: data })
    } catch (error) {
        return res.status(200).json({ errorcode: 5, status: false, msg: error.message, data: error });
    }
}

export const editNumericalTest = async (req, res) => {
    try {
        const { name, _id } = req.body;
        if (!_id) return res.status(200).json({ errorcode: 1, status: false, msg: "Id is required", data: null })
        let test = await NumericalTest.findById(_id)
        if (!test) return res.status(200).json({ errorcode: 2, status: false, msg: "Numerical test not found", data: null })
        let testEx = await NumericalTest.findOne({ name: name })
        if (testEx) return res.status(200).json({ errorcode: 3, status: false, msg: "Name is in use", data: null })
        test.name = name ? name : test.name
        test = await test.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Numerical test Updated Successfully", data: test })
    } catch (error) {
        return res.status(200).json({ errorcode: 5, status: false, msg: error.message, data: error });
    }
}

export const postNewNumericalTest = async (req, res) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        const { category, language } = req.params;
        let test = new NumericalTest({ name, superCategory: category, language })
        test = await test.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "New Numerical test created ", data: test })
    } catch (error) {
        return res.status(200).json({ errorcode: 5, status: false, msg: error.message, data: error });
    }
}

export const deleteNumericalTest = async (req, res) => {
    console.log("============DELETE Num TEst===========");
    console.log("req.body", req.body);
    try {
        // const {category,language}=req.params
        const { name, _id, language, category } = req.body
        let SASCat = await NumericalTest.findOne({ language: language, superCategory: category, _id: _id })
        if (!SASCat) return res.status(200).json({ errorcode: 1, status: false, msg: "Numerical-Test Not Found", data: null })
        await NumericalTest.deleteOne({ language: language, superCategory: category, _id: _id })
        return res.status(200).json({ errorcode: 0, status: true, msg: "Numerical-Test  Deleted Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const addNewQuestion = async (req, res) => {
    console.log("============Add addNewQuestion===========");
    console.log("req.body", req.body);
    try {
        // const {id}=req.params
        const { q, option, a, id } = req.body
        let o1 = option[0]?.options ? option[0]?.options : null
        let o2 = option[1]?.options ? option[1]?.options : null
        let o3 = option[2]?.options ? option[2]?.options : null
        let o4 = option[3]?.options ? option[3]?.options : null
        // let numTest = await NumericalTest.findOne({_id:id})
        // if(!numTest)  return res.status(200).json({ errorcode: 1, status: false, msg: "Numerical-Test Not Found", data: null })
        let updateObj = { q, o1, o2, o3, o4, a }
        await NumericalTest.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $push: { qAndA: updateObj } })
        return res.status(200).json({ errorcode: 0, status: true, msg: "Numerical-Test Question Added Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const deleteQuestion = async (req, res) => {
    console.log("============deleteQuestion===========");
    console.log("req.body", req.body);
    try {
        const { id } = req.params
        const { q, o1, o2, o3, o4, a, _id } = req.body
        // let numTest = await NumericalTest.findOne({ _id: _id })
        let numTest = await NumericalTest.findOne(
            {
                "qAndA._id": mongoose.Types.ObjectId(_id)
            }
        )
        if (!numTest) return res.status(200).json({ errorcode: 1, status: false, msg: "Numerical-Test Not Found", data: null })
        await NumericalTest.updateOne({ _id: numTest._id }, { $pull: {qAndA:{id} } })
        return res.status(200).json({ errorcode: 0, status: true, msg: "Numerical-Test Question Deleted Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const editQuestion = async (req, res) => {
    console.log("============editQuestion ===========");
    console.log("req.body", req.body);
    try {
        const { q, o1, o2, o3, o4, a, id } = req.body
        let numTest = await NumericalTest.findOne(
            {
                "qAndA._id": mongoose.Types.ObjectId(id)
            }
        )
        console.log("numTest", numTest);
        if(!numTest)  return res.status(200).json({ errorcode: 1, status: false, msg: "Numerical-Test Not Found", data: null })
        numTest = await NumericalTest.findOneAndUpdate(
            { "qAndA._id": id },
            {
                $set: {
                    "qAndA.$.q": q,
                    "qAndA.$.a": a,
                    "qAndA.$.o1": o1,
                    "qAndA.$.o2": o2,
                    "qAndA.$.o3": o3,
                    "qAndA.$.o4": o4,
                },
            }
            // { new: true }
        ).exec()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Numerical-Test Question Updated Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
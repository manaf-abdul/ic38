import NumericalTest from "../Models/NumericalTest.Model.js";
import { fileParser } from "../utils/fileParser.js";
import slugify from "slugify";

export const postNumericalTest = async (req, res) => {
    try {
        if (!req.file) return res.status(200).json({ errorcode: 1, status: false, msg: "File Not Present", data: null })
        const { name, description, category, language } = req.body;
        let ex = await NumericalTest.findOne({ slug: slugify(name) })
        if (ex) return res.status(200).json({ errorcode: 2, status: false, msg: "Already Present", data: null })
        const data = fileParser(req.file.buffer)
        console.log("data", data)
        let newPost = new NumericalTest({
            name,
            slug: slugify(name),
            superCategory: category,
            language: language,
            numberOfQes: data[0].data.length,
            description,
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
        return res.status(200).json({ errorcode: 0, status: true, msg: "Numerpractise test found ", data: data })
    } catch (error) {
        return res.status(200).json({ errorcode: 5, status: false, msg: error.message, data: error });
    }
}

export const editNumericalTest = async (req, res) => {
    try {
        const { name,_id } = req.body;
        if (!_id) return res.status(200).json({ errorcode: 1, status: false, msg: "Id is required", data: null })
        let test = await NumericalTest.findById(_id)
        if (!test) return res.status(200).json({ errorcode: 2, status: false, msg: "Numerical test not found", data: null })
        let testEx=await NumericalTest.findOne({name:name})
        if (testEx) return res.status(200).json({ errorcode: 3, status: false, msg: "Name is in use", data: null })
        test.name=name?name:test.name
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
        let test=new NumericalTest({name,superCategory:category,language})
        test=await test.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "New Numerical test created ", data: test })
    } catch (error) {
        return res.status(200).json({ errorcode: 5, status: false, msg: error.message, data: error });
    }
}

export const deleteNumericalTest = async (req, res) => {
    console.log("============DELETE Num TEst===========");
    console.log("req.body",req.body);
    try {
        // const {category,language}=req.params
        const {name,_id,language,category}=req.body
        let SASCat = await NumericalTest.findOne({language:language,superCategory:category,_id:_id})
        if(!SASCat)  return res.status(200).json({ errorcode: 1, status: false, msg: "Numerical-Test Not Found", data: null })
        await NumericalTest.deleteOne({language:language,superCategory:category,_id:_id})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Numerical-Test  Deleted Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const addNewQuestion = async (req, res) => {
    console.log("============Add addNewQuestion===========");
    console.log("req.body",req.body);
    try {
        const {id}=req.params
        const {q,o1,o2,o3,o4,a}=req.body
        let numTest = await NumericalTest.findOne({_id:_id})
        if(!numTest)  return res.status(200).json({ errorcode: 1, status: false, msg: "Numerical-Test Not Found", data: null })
        let updateObj={q,o1,o2,o3,o4,a}
        await NumericalTest.updateOne({_id:_id},{$push:{qAndA:updateObj}})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Numerical-Test Question Added Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const deleteQuestion = async (req, res) => {
    console.log("============deleteQuestion===========");
    console.log("req.body",req.body);
    try {
        const {id}=req.params
        const {q,o1,o2,o3,o4,a,_id}=req.body
        let numTest = await NumericalTest.findOne({_id:_id})
        if(!numTest)  return res.status(200).json({ errorcode: 1, status: false, msg: "Numerical-Test Not Found", data: null })
        let updateObj={q,o1,o2,o3,o4,a}
        await NumericalTest.updateOne({_id:_id},{$pull:{qAndA:_id}})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Numerical-Test Question Added Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const editQuestion = async (req, res) => {
    console.log("============editQuestion===========");
    console.log("req.body",req.body);
    try {
        const {id}=req.params
        const {q,o1,o2,o3,o4,a,_id}=req.body
        let numTest = await NumericalTest.findOne({_id:_id})
        if(!numTest)  return res.status(200).json({ errorcode: 1, status: false, msg: "Numerical-Test Not Found", data: null })
        let updateObj={q,o1,o2,o3,o4,a}
        await NumericalTest.updateOne({_id:_id},{$pull:{qAndA:_id}})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Numerical-Test Question Added Successfully", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
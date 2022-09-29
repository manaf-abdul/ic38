import testModel from "../Models/PractiseTest.model.js";
import { fileParser } from "../utils/fileParser.js";
import slugify from "slugify";

export const postMockTest = async (req, res) => {
    if (!req.file) return res.status(200).json({ errorcode: 1, status: false, msg: "File Not Present", data: null })
    const { name, description } = req.body;
    let ex = await testModel.findOne({ slug: slugify(name) })
    if (ex) return res.status(200).json({ errorcode: 2, status: false, msg: "Already Present", data: null })
    const data = fileParser(req.file.buffer)
    console.log("data", data)
    let newPost = new testModel({
        name,
        slug: slugify(name),
        numberOfQes: data[0].data.length,
        description,
        qAndA: data[0].data
    })
    newPost = await newPost.save()
    return res.status(200).json({ errorcode: 0, status: true, msg: "Created Successfully", data: data })
}

export const getMockTest = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(200).json({ errorcode: 0, status: false, msg: "Id is required", data: null })
    let data = await testModel.findById(id)
    return res.status(200).json({ errorcode: 0, status: true, msg: "practise test found ", data: data })
}

export const getAllMockTests = async (req, res) => {
    let data = await testModel.find({}, { name: 1, slug: 1, description: 1 })
    return res.status(200).json({ errorcode: 0, status: true, msg: "practise test found ", data: data })
}

export const editMockTest = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id) return res.status(200).json({ errorcode: 0, status: false, msg: "Id is required", data: null })
    if (!req.file) return res.status(200).json({ errorcode: 1, status: false, msg: "File Not Present", data: null })
    let test = await testModel.findById(id)
    if (!test) return res.status(200).json({ errorcode: 0, status: false, msg: "mock test not found", data: null })
    const fileData = fileParser(req.file.buffer)
    test.name=name?name:test.name;
    if(name) test.slug=slugify(name)
    test.description=description?description:test.description;
    test.qAndA=req.file && fileData ? fileData[0].data:test.qAndA;
    test.numberOfQes=req.file && fileData ? fileData[0].data.length:test.numberOfQes;
    test=await test.save()
    return res.status(200).json({ errorcode: 0, status: true, msg: "practise test found ", data: test })
}
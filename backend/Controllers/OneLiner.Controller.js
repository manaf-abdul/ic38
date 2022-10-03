import OneLiner from "../Models/OneLiner.models.js";
import { fileParser } from "../utils/fileParser.js";

export const postOneLiners = async (req, res) => {
    try {
        await OneLiner.deleteMany()
        const {category,language}=req.params
        console.log("req.body", req.body.language)
        console.log("req.file", req.file)
        if (!req.file) return res.status(200).json({ errorcode: 0, status: false, msg: "File not present", data: null })
        const fileData = fileParser(req.file.buffer)
        if (!fileData) return res.status(200).json({ errorcode: 0, status: false, msg: "Error Reading your file", data: null })
        let data = fileData[0].data.map(x => {
            return {
                ...x,
                language:language ,
                superCategory: category
            }
        })
        console.log("data",data)
        let newOneLiners = await OneLiner.create(data)
        return res.status(200).json({ errorcode: 0, status: true, msg: "OneLiner Updated Successfully", data: newOneLiners });
    } catch (e) {
        // console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getOneLiners = async (req, res) => {
    try {
        const {category,language}=req.params
        if(!category || !language)  return res.status(200).json({ errorcode: 1, status: false, msg: "Category & Language should be present", data: null })
        let data = await OneLiner.find({language:language,superCategory:category})
        return res.status(200).json({ errorcode: 0, status: true, msg: "Concept Chapter Found", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}
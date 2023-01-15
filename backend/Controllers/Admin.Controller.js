import Admin from "../Models/Admin.Model.js";
import jwt from "jsonwebtoken";
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


export const adminSignIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(200).json({ errorcode: 1, status: false, msg: "Email And Password is needed", data: null });
        let user = await Admin.findOne({ name: email, password: password })
        if (!user) return res.status(200).json({ errorcode: 2, status: false, msg: "Admin Not Found", data: null });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "300d" });
        user = { ...user._doc, password: null, token };
        //await insertNotifcation({ userid: user._id, title: "Logged In", message: "Login Successfull" });
        return res.status(200).json({ errorcode: 0, status: true, msg: "Logged In successfully.", data: user });
    } catch (e) {
        return res.status(200).json({ errorcode: 5, status: false, msg: e, data: e });
    }
};

export const adminSignUp = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = new Admin({
            name: email,
            password
        })
        user = user.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "Logged In successfully.", data: user });
    } catch (e) {
        return res.status(200).json({ errorcode: 5, status: false, msg: e, data: e });
    }
};


export const adminData = async (req, res) => {
    try {
        const { category, language } = req.body
        let enotes = await ENote.find({ superCategory: category, language: language }).countDocuments()
        let exam = await ExamSyllabus.find({ superCategory: category, language: language }).countDocuments()
        let liveTest = await LiveTestSet.find({ superCategory: category, language: language }).countDocuments()
        let mockTest = await MockTest.find({ superCategory: category, language: language }).countDocuments()
        let numericalTest = await NumericalTest.find({ superCategory: category, language: language }).countDocuments()
        let oneLiner = await OneLiner.find({ superCategory: category, language: language }).countDocuments()
        let practiseTest = await PractiseTest.find({ superCategory: category, language: language }).countDocuments()
        let shortAndSimple = await ShortSimpleCategory.find({ superCategory: category, language: language }).countDocuments()
        let terminologys = await terminology.find({ superCategory: category, language: language }).countDocuments()
        let video = await VideoTutorials.find({ category: category, language: language }).countDocuments()
        let data = { enotes, exam, liveTest, mockTest, numericalTest, oneLiner,practiseTest,shortAndSimple,terminologys,video }
        return res.status(200).json({ errorcode: 0, status: true, msg: "Logged In successfully.", data: data });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e, data: e });
    }
};
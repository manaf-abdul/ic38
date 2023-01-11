import Admin from "../Models/Admin.Model.js";
import jwt from "jsonwebtoken";

export const adminSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(200).json({
        errorcode: 1,
        status: false,
        msg: "Email And Password is needed",
        data: null,
      });
    let user = await Admin.findOne({ name: email, password: password });
    if (!user)
      return res.status(200).json({
        errorcode: 2,
        status: false,
        msg: "Admin Not Found",
        data: null,
      });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "300d",
    });
    user = { ...user._doc, password: null, token };
    //await insertNotifcation({ userid: user._id, title: "Logged In", message: "Login Successfull" });
    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "Logged In successfully.",
      data: user,
    });
  } catch (e) {
    return res
      .status(200)
      .json({ errorcode: 5, status: false, msg: e, data: e });
  }
};

export const adminSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = new Admin({
      name: email,
      password,
    });
    user = user.save();
    return res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "Logged In successfully.",
      data: user,
    });
  } catch (e) {
    return res
      .status(200)
      .json({ errorcode: 5, status: false, msg: e, data: e });
  }
};

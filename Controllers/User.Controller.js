import User from '../Models/User.models.js'

export const signIn = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errs = [];
            let err_msgs = { ...errors };
            err_msgs.errors.forEach(err => errs.push(err.msg));
            return res.status(200).json({ errorcode: 1, status: false, msg: errs, data: null });
        }
        const { email, password } = req.body
        let user = await User.findOne({ email: email })
        if (!user) return res.status(200).json({ errorcode: 2, status: false, msg: "User doesn't Exist", data: null });
        const cmpPass = await comparePassword(password, user.password);
        if (!cmpPass) {
            res.status(200).json({ errorcode: 3, status: false, msg: "Incorrect Password.", data: null });
        } else {
            // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "300d" });
            user = { ...user._doc, password: null, token };
            //await insertNotifcation({ userid: user._id, title: "Logged In", message: "Login Successfull" });
            return res.status(200).json({ errorcode: 0, status: true, msg: "Logged In successfully.", data: user });
        }
        // res.status(200).json({ errorcode: 0, status: false, msg: "User signup succesffull", data: null });
    } catch (e) {
        console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e, data: e });
    }
};

export const signUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errs = [];
            let err_msgs = { ...errors };
            err_msgs.errors.forEach(err => errs.push(err.msg));
            return res.status(200).json({ errorcode: 1, status: false, msg: errs, data: null });
        }
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) return res.status(200).json({ errorcode: 2, status: false, msg: "Fill all the fields", data: null })

        const existingUser=await User.findOne({email:email})
        if (existingUser) return res.status(200).json({ errorcode: 3, status: false, msg: "User already Present.Please Login", data: null })

        let newUser = await User.create({
            name, email, phone, password
        })
        if (newUser) {
            // const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "300d" });
            // newUser = { ...newUser._doc, password: null, token };
            return res.status(400).json({ errorcode: 0, status: false, msg: "User SignUp Successfull", data: newUser });
        }
    } catch (e) {
        return res.status(400).json({errorcode: 5, status: false, msg: e.message, data: null });
    }
}
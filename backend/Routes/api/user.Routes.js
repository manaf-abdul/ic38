import  express  from "express";
const router=express.Router()
import {signUp,signIn,sendOtpforForgotPssword,confirmOtpforForgotPssword,changePassword} from '../../Controllers/User.Controller.js'

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/send-otp-forgotpassword", sendOtpforForgotPssword)
router.post("/confirm-otp-forgotpassword", confirmOtpforForgotPssword)
router.post("/changePassword", changePassword)

export default router
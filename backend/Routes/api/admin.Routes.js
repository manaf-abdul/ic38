import express from "express";
import { adminSignIn, adminSignUp } from "../../Controllers/Admin.Controller.js";
const router=express.Router()

router.post('/login',adminSignIn)
router.post('/signup',adminSignUp)

export default router
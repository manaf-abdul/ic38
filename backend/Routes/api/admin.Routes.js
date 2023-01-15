import express from "express";
import { adminData, adminSignIn, adminSignUp } from "../../Controllers/Admin.Controller.js";
const router=express.Router()

router.post('/login',adminSignIn)
router.post('/signup',adminSignUp)
router.post('/data',adminData)

export default router
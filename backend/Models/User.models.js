import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userModel = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            default: null,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            trim: true, 
            lowercase: true
        },
        phone: {
            type: String,
            // required: true
        },
        password: {
            type: String,
            required: true
        },
        occupation: {
            type: String,
            // required: true
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            lowercase: true,
        },
        emailOtp:{
            type: String,
            default: null
        },
        location:{
            type: String,
            default: null
        },
        qualification:{
            type: String,
            default: null
        },
        dateOfBirth:{
            type: String,
            default: null
        },
        income:{
            type: Number,
            default: null
        },
        panNumber:{
            type: Number,
            default: null
        },
        profilePic:{},
        bloodGroup:{
            type: String,
            default: null
        }
    }
)

userModel.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

const User=mongoose.model("User",userModel)
export default User
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userModel = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter the username"]
        },
        email: {
            type: String,
            required: [true, "Please enter the email"]
        },
        phone: {
            type: String,
            required: [true, "Please enter the phone"]
        },
        password: {
            type: String,
            required: [true, "Please enter the password"]
        },
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
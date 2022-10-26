import mongoose from 'mongoose'

const schema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        dateAndTime:{
            type:Date,
            required:true
        },
    },{
        timestamps:true
    }
)
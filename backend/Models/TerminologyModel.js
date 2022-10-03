import mongoose from "mongoose";

const schema=new mongoose.Schema(
    {
        language:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Language',
        },
        superCategory:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'SuperCategory',
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true
        }
    }
)

const terminology=new mongoose.model('Terminology',schema)
export default terminology
import mongoose from "mongoose";

const schema=new mongoose.Schema(
    {
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
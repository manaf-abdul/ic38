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
        subCategory:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'ShortSimpleCategory',
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

const ShortAndSimple=new mongoose.model('ShortAndSimple',schema)
export default ShortAndSimple
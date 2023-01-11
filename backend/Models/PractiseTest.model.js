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
        name:{
            type:String
        },
        slug:{
            type:String,
            lowercase:true
        },
        numberOfQes:{
            type:String
        },
        description:{
            type:String
        },
        qAndA:[
                {
                q:{ type: String, default: null },
                o1: { type: String, default: null },
                o2: { type: String, default: null },
                o3: { type: String, default: null },
                o4: { type: String, default: null },
                a:{ type: String, default: null }
            }
        ]
    },
    {
        timestamps:true
    }
)

const PractiseTest=new mongoose.model('PractiseTest',schema)
export default PractiseTest
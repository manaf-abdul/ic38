import mongoose from 'mongoose';

const schema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:"User"
        },
        result:{
            type:Number,
            required:true
        },
        testId:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:"LiveTestSet"
        }
    }
)

const LiveTestResult=new mongoose.model('LiveTestResult',schema)
export default LiveTestResult
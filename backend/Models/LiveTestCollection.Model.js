import mongoose from 'mongoose'

const schema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        dateAndTime1:{
            type:String,
            required:true
        },
        dateAndTime2:{
            type:String,
            required:true
        },
        language: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Language',
        },
        superCategory: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'SuperCategory',
        },
        attended:{
            type:Number,
            default:0
        },
    },{
        timestamps:true
    }
)

const LiveTestSet = new mongoose.model('LiveTestSet', schema)
export default LiveTestSet
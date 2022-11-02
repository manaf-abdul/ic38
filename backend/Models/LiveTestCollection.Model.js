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
        language: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Language',
        },
        superCategory: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'SuperCategory',
        }
    },{
        timestamps:true
    }
)

const LiveTestSet = new mongoose.model('LiveTestSet', schema)
export default LiveTest
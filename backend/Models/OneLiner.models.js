import mongoose from 'mongoose'

const schema=mongoose.Schema(
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
        content:{
            type:String,
            required:true
        }
    },{
        timeStamps:true
    }
)

const OneLiner=mongoose.model('OneLiner',schema)
export default OneLiner
import mongoose from 'mongoose'

const schema=mongoose.Schema(
    {   
        superCategory:{
            type:mongoose.Schema.Types,
            ref:'SuperCategory',
            required:true
        },
        language:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Language',
        },
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        }
    },{
        timeStamps:true
    }
)

const ENotes=mongoose.model('ENotes',schema)
export default ENotes
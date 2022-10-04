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
        name:{
            type:String,
            required:true
        }
    },{
        timeStamps:true
    }
)

const ShortSimpleCategory=mongoose.model('ShortSimpleCategory',schema)
export default ShortSimpleCategory
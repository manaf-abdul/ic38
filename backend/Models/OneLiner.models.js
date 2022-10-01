import mongoose from 'mongoose'

const schema=mongoose.Schema(
    {
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
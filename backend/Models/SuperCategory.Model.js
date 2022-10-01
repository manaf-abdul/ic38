import mongoose from 'mongoose'

const schema=mongoose.Schema(
    {   
        name:{
            type:String,
            required:true
        }
    },{
        timeStamps:true
    }
)

const SuperCategory=mongoose.model('SuperCategory',schema)
export default SuperCategory
import mongoose from 'mongoose'

const Schema=mongoose.Schema(
    {
        language:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Language"
        },
        title:{
            type:String,
            required:true
        },
        file:[{}]
    },{
        timeStamps:true
    }
)

const Poster=mongoose.model('Poster',Schema)
export default Poster
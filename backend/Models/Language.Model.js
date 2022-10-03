import mongoose from 'mongoose';

const schema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        }
    }
)

const Language=new mongoose.model('Language',schema)
export default Language
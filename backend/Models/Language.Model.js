import mongoose from 'mongoose';

const schema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Language Name is Required"]
        }
    }
)

const Language=new mongoose.model('Language',schema)
export default Language
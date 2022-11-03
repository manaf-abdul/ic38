import mongoose from 'mongoose';

const schema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    }
)

const Admin=new mongoose.model('Admin',schema)
export default Admin
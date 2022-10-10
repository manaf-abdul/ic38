import mongoose from 'mongoose'

const schema=mongoose.Schema(
    {   
        name:{
            type:String,
            required:true
        },
        file:{ }
    },{
        timeStamps:true
    }
)

const VideoTutorials=mongoose.model('VideoTutorials',schema)
export default VideoTutorials
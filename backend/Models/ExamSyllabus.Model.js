import mongoose from 'mongoose'

const conceptContentSchema=mongoose.Schema(
    {
        superCategory:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SuperCategory"
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

const ExamSyllabus=mongoose.model('ExamSyllabus',conceptContentSchema)
export default ExamSyllabus
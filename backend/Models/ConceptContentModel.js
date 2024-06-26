import mongoose from 'mongoose'

const conceptContentSchema=mongoose.Schema(
    {
        chapterId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"ConceptChapter"
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

const ConceptContent=mongoose.model('ConceptContent',conceptContentSchema)
export default ConceptContent
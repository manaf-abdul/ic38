import mongoose from 'mongoose'

const conceptSchema=mongoose.Schema(
    {
        chapterTitle:{
            type:String,
            required:true
        },
        slug:{
            type:String,
            lowercase: true,
        }
    },{
        timeStamps:true
    }
)

const ConceptChapter=mongoose.model('ConceptChapter',conceptSchema)
export default ConceptChapter
import mongoose from 'mongoose'

const NoteSchema= mongoose.Schema(
    {   
        superCategory:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'SuperCategory',
            required:true
        },
        language:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Language',
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

const ENote=mongoose.model('ENote',NoteSchema)
export default ENote

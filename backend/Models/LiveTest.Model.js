import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        language: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Language',
        },
        superCategory: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'SuperCategory',
        },

        q: { type: String, default: null },
        o1: { type: String, default: null },
        o2: { type: String, default: null },
        o3: { type: String, default: null },
        o4: { type: String, default: null },
        a: { type: String, default: null }

    },
    {
        timestamps: true
    }
)

const LiveTest = new mongoose.model('LiveTest', schema)
export default LiveTest
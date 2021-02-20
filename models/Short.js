import mongoose from 'mongoose'

const ShortSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true
    },
    urlDest: {
        type: String,
        required: true
    },
    hits: {
        type: Number,
        default: 0
    },
    shortDeleted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.models.Short || mongoose.model('Short', ShortSchema)
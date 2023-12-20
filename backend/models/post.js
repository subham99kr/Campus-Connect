const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    content: String,
    associated_course:
    {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
    uploader:
    {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('post', PostSchema);
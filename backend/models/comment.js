const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    associated_post:
    {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    uploader:
    {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('comment', CommentSchema);
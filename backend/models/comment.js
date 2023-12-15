const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
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
        default: Date.now, // Assign the current date and time by default
        // other validation options...
    }
})

CommentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('comment', CommentSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    rated_course:
    {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
    rated_by:
    {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    criteria1: Number,
    criteria2: Number,
    criteria3: Number,
    criteria4: Number,
    criteria5: Number,
    criteria6: Number,
    criteria7: Number,
    criteria8: Number,
    criteria9: Number,
    criteria10: Number,
    date: {
        type: Date,
        default: Date.now, // Assign the current date and time by default
        // other validation options...
    }
})

module.exports = mongoose.model('rating', RatingSchema);

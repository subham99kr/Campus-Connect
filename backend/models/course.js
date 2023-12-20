const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    description: String,
    instructor: String,
    current_rating: Number,
    material_direct: [
        {
            title: String,
            url: String,
            uploader: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    material_link: [
        {
            title: String,
            url: String,
            uploader: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    associated_posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    ratings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'rating'
        }
    ],
    stars: {
        type: [Number],
        default: Array(10).fill(0),
    }
})

module.exports = mongoose.model('course', CourseSchema);

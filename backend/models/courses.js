const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    prof: String
})

module.exports = mongoose.model('Courses', CoursesSchema);

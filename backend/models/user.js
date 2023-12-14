const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    admission_no: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'course'
        }
    ],
    is_admin: Boolean
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('user', UserSchema);
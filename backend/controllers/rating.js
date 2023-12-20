const Course = require("../models/course");
const Rating = require("../models/rating")
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.addRating = async (req, res) => {
    const {
        course_id,
        criteria1,
        criteria2,
        criteria3,
        criteria4,
        criteria5,
    } = req.body;
    try {
        const course = await Course.findById(course_id);
        jwt.verify(req.token, process.env.JWT_KEY, async (err, authorizedData) => {
            if (err) {
                res.status(403).json({
                    message: "protected Route"
                })
            } else {
                if (authorizedData.hasOwnProperty("user")) {
                    const user = await User.findById(authorizedData.user._id);
                    if (user.courses.includes(course_id)) {
                        res.status(403).json({
                            message: "you have already rated this course"
                        })
                    }
                    else {
                        user.courses.push(course_id);
                        await user.save();
                        const new_rating = {
                            rated_course: course_id,
                            rated_by: authorizedData.user._id,
                            criteria1: criteria1,
                            criteria2: criteria2,
                            criteria3: criteria3,
                            criteria4: criteria4,
                            criteria5: criteria5,
                        }
                        const rating = new Rating(new_rating);
                        await rating.save();
                        for (let i = 0; i < 5; i++) {
                            course.stars[i] = course.stars[i] + rating[`criteria${i + 1}`];
                        }
                        course.ratings.push(rating._id);
                        await course.save();
                        res.status(200).json({
                            message: "succesfully rated"
                        })
                    }
                } else {
                    res.status(401).json({ message: "Unauthorized access to user's profile" });
                }
            }
        })
    } catch (err) {
        res.status(500).json({ message: e.message, name: e.name });
    }
}


module.exports.editRating = async (req, res) => {
    try {
        const { id } = req.params;
        jwt.verify(req.token, process.env.JWT_KEY, async (err, authorizedData) => {
            if (err) {
                res.status(403).json({
                    message: "protected Route"
                })
            } else {
                if (authorizedData.hasOwnProperty("user")) {
                    const user = await User.findById(authorizedData.user._id);
                    if (user.courses.includes(id)) {
                        await Rating.findByIdAndUpdate(id, { ...req.body.rating });
                        res.status(200).json({
                            message: "succesfully edited"
                        })
                    }
                    else {
                        res.status(403).json({
                            message: "unauthorized edit"
                        })
                    }
                } else {
                    res.status(401).json({ message: "Unauthorized access to user's profile" });
                }
            }
        })
    } catch (err) {
        res.status(500).json({ message: e.message, name: e.name });
    }
}
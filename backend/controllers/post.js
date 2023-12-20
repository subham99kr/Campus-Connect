const Course = require("../models/course")
const Comment = require("../models/comment")
const Post = require("../models/post")
const jwt = require("jsonwebtoken");

module.exports.addPost = async (req, res) => {
    try {
        const {
            course_id,
            title,
            content
        } = req.body;
        const course = await Course.findById(course_id);
        jwt.verify(req.token, process.env.JWT_KEY, async (err, authorizedData) => {
            if (err) {
                res.status(403).json({
                    message: "protected Route"
                });
            } else {
                if (authorizedData.hasOwnProperty("user")) {
                    const new_post = {
                        title: title,
                        content: content,
                        associated_course: course_id,
                        uploader: authorizedData.user._id
                    }
                    const post = new Post(new_post);
                    await post.save();
                    course.associated_posts.push(post._id);
                    await course.save();
                    res.status(200).json({ message: "successfully posted" })
                } else {
                    res.status(401).json({ message: "Unauthorized access to user's profile" });
                }
            }
        });
    }
    catch (e) {
        res.status(500).json({ message: e.message, name: e.name });
    }
}
module.exports.viewComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments');
        res.status(200).json(post.comments);
    }
    catch (e) {
        res.status(500).json({ message: e.message, name: e.name });
    }
}
module.exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        jwt.verify(req.token, process.env.JWT_KEY, async (err, authorizedData) => {
            if (err) {
                res.status(403).json({
                    message: "protected Route"
                });
            } else {
                if (authorizedData.hasOwnProperty("user") && authorizedData.user._id == post.uploader) {
                    for (let comment_id of post.comments) {
                        await Comment.findByIdAndDelete(comment_id);
                    }
                    const course = await Course.findById(post.associated_course);
                    const index = course.associated_posts.indexOf(id);
                    course.associated_posts.splice(index, 1);
                    await course.save();
                    await Post.findByIdAndDelete(id);
                    res.status(200).json({ message: "Successfully deleted" });
                }
                else {
                    res.status(403).json({ message: "not authorized to delete this post" })
                }
            }
        })
    }
    catch (e) {
        res.status(401).json({ name: e.name, message: e.message });
    }
}
module.exports.editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        jwt.verify(req.token, process.env.JWT_KEY, async (err, authorizedData) => {
            if (err) {
                res.status(403).json({
                    message: "protected Route"
                });
            } else {
                if (authorizedData.hasOwnProperty("user") && authorizedData.user._id == post.uploader) {
                    await Post.findByIdAndUpdate(id, { ...req.body.post });
                    res.status(200).json({ message: "Successfully edited" });
                }
                else {
                    res.status(403).json({ message: "not authorized to edit this post" })
                }
            }
        })
    }
    catch (e) {
        res.status(401).json({ name: e.name, message: e.message });
    }
}
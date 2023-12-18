const Course = require("../models/course")
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
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: "Successfully deleted" });

    }
    catch (e) {
        res.status(401).json({ name: e.name, message: e.message });
    }
}
module.exports.editPost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndUpdate(id, { ...req.body.post });
        res.status(200).json({ message: "Successfully edited" });

    }
    catch (e) {
        res.status(401).json({ name: e.name, message: e.message });
    }
}
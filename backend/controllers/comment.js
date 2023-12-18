const Comment = require("../models/comment")
const Post = require("../models/post")
const jwt = require("jsonwebtoken")

module.exports.addComment = async (req, res) => {
    try {
        const {
            post_id,
            content
        } = req.body;
        const post = await Post.findById(post_id);

        jwt.verify(req.token, process.env.JWT_KEY, async (err, authorizedData) => {
            if (err) {
                res.status(403).json({
                    message: "protected Route"
                });
            } else {
                if (authorizedData.hasOwnProperty("user")) {
                    const new_comment = {
                        content: content,
                        associated_post: post_id,
                        uploader: authorizedData.user._id
                    }
                    const comment = new Comment(new_comment);
                    await comment.save();
                    post.comments.push(comment._id);
                    await post.save();
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
module.exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.findByIdAndDelete(id);
        res.status(200).json({ message: "Successfully deleted" });

    }
    catch (e) {
        res.status(401).json({ name: e.name, message: e.message });
    }
}
module.exports.editComment = async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.findByIdAndUpdate(id, { ...req.body.comment });
        res.status(200).json({ message: "Successfully edited" });

    }
    catch (e) {
        res.status(401).json({ name: e.name, message: e.message });
    }
}
const Comment = require("../models/comment")
const Post = require("../models/post")

module.exports.addComment = async (req, res) => {
    try {
        const {
            post_id,
            user_id,
            content
        } = req.body;
        const post = await Post.findById(post_id);
        const new_comment = {
            content: content,
            associated_post: post_id,
            uploader: user_id
        }
        post.comments.push(new_comment);
        await post.save();
        const comment = new Comment(new_comment);
        await comment.save();
        res.status(200).json({ message: "successfully posted" })
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
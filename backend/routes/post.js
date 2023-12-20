const express = require("express");
const Post = require("../controllers/post")
const { checkToken } = require("../middleware");

const router = express.Router();

router.route("/new")
    .post(checkToken, Post.addPost)

router.route("/:id/comments")
    .get(Post.viewComments)// single coures view

router.route("/:id/delete")
    .delete(checkToken, Post.deletePost)

router.route("/:id/edit")
    .put(Post.editPost)

module.exports = router;

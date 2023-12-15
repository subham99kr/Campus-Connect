const express = require("express");
const Comment = require("../controllers/comment")
const { checkToken } = require("../middleware");

const router = express.Router();

router.route("/new")
    .post(checkToken, Comment.addComment)

router.route("/:id/delete")
    .delete(checkToken, Comment.deleteComment)

router.route("/:id/edit")
    .post(checkToken, Comment.editComment)

module.exports = router;

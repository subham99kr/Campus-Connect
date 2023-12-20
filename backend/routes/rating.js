const express = require("express");
const Rating = require("../controllers/rating")
const { checkToken } = require("../middleware");

const router = express.Router();

router.route("/new")
    .post(checkToken, Rating.addRating);

router.route("/:id/edit")
    .post(checkToken, Rating.editRating);

module.exports = router;

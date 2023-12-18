const express = require("express");
const User = require("../controllers/user")
const catchAsync = require("../utils/catchAsync");
const { checkToken } = require("../middleware");
const passport = require("passport");

const router = express.Router();

router.route("/register")
  .post(catchAsync(User.registerUser));

router.route("/login")
  .post(passport.authenticate("local", { failureRedirect: "/user/failure", failureMessage: true, }), User.loginUser);

router.route("/view")
  .get(checkToken, User.viewUser);

router.route("/:id/get_name")
  .get(User.getName);

router.route("/failure")
  .get((req, res) => res.status(401).json({ message: "Incorrect username or password" }));

module.exports = router;
const express = require("express");
const Course = require("../controllers/course")
const { checkToken } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });


const router = express.Router();

router.route("/")
    .get(Course.allView)// all course list
    .post(Course.addCourse)

router.route("/:id")
    .get(Course.singleView)// single coures view

router.route("/add_material_direct")
    .post(checkToken, upload.array('material'), Course.addMaterialDirect)

router.route("/add_material_link")
    .post(checkToken, Course.addMaterialLink)

module.exports = router;
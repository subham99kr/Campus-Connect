const jwt = require("jsonwebtoken");
const Course = require("../models/course");
const { authorize } = require("passport");

module.exports.allView = async (req, res) => {
    try {
        const courseList = await Course.find({});
        res.status(200).json(courseList);
    }
    catch (e) {
        res.status(500).json({ name: e.name, message: e.message });
    }
}

module.exports.addCourse = async (req, res) => {
    const {
        code,
        name,
        description,
        instructor
    } = req.body;
    const course = new Course({
        code: code,
        name: name,
        description: description,
        instructor: instructor
    })
    await course.save();
    res.status(201).json({ message: "course succesfully added" });
}

module.exports.singleView = async (req, res) => {
    try {
        const course_id = req.params.id;
        const oneCourse = await Course.findById(course_id);
        await oneCourse.populate('associated_posts');
        res.status(200).json(oneCourse);
    }
    catch (e) {
        res.status(500).json({ message: e.message, name: e.name });
    }
}

module.exports.addMaterialDirect = async (req, res) => {
    try {
        const {
            course_id,
            title
        } = req.body;
        const course = await Course.findById(course_id);
        jwt.verify(req.token, process.env.JWT_KEY, async (err, authorizedData) => {
            if (err) {
                res.status(403).json({
                    message: "protected Route"
                });
            } else {
                if (authorizedData.hasOwnProperty("user")) {
                    const new_material = {
                        title: title,
                        url: (req.files[0]).path,
                        uploader: authorizedData.user._id
                    }
                    course.material_direct.push(new_material);
                    await course.save();
                    res.status(200).json({
                        message: "material succesfully uploaded"
                    });
                }
            }
        })
    }
    catch (e) {
        res.status(500).json({ message: e.message, name: e.name });
    }
}

module.exports.addMaterialLink = async (req, res) => {
    try {
        const {
            course_id,
            title,
            link
        } = req.body;
        const course = await Course.findById(course_id);
        jwt.verify(req.token, process.env.JWT_KEY, async (err, authorizedData) => {
            if (err) {
                res.status(403).json({
                    message: "protected Route"
                });
            } else {
                if (authorizedData.hasOwnProperty("user")) {
                    const new_material = {
                        title: title,
                        url: link,
                        uploader: authorizedData.user._id
                    }
                    course.material_link.push(new_material);
                    await course.save();
                    res.status(200).json({
                        message: "material link succesfully saved"
                    });
                }
            }
        })
    }
    catch (e) {
        res.status(500).json({ message: e.message, name: e.name });
    }
}
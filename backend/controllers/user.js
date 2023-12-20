const User = require("../models/user")
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            admission_no,
            username,
            password
        } = req.body;
        const user = new User({
            name: name,
            email: email,
            admission_no: admission_no,
            username: username,
            is_admin: 0
        });
        await User.register(user, password);
        jwt.sign(
            { user },
            process.env.JWT_KEY,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    res.status(403).json({
                        message: "protected Route"
                    });
                }
                res.status(201).json({
                    message: "Registration Successful",
                    token: token,
                    role: user.is_admin ? "admin" : "user",
                });
            }
        );
    }
    catch (e) {
        res.status(500).json({
            name: e.name,
            message: e.message
        });
    }
}


module.exports.loginUser = async (req, res) => {
    try {
        var username = req.body.username;
        const user = await User.findOne({ username });
        jwt.sign(
            { user },
            process.env.JWT_KEY,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    res.status(403).json({
                        message: "protected Route"
                    });
                }
                res.status(200).json({
                    message: "Login Successful",
                    token: token,
                    role: user.is_admin ? "admin" : "user",
                });
            }
        );
    } catch (err) {
        res.status(500).json({
            name: err.name,
            error: err.message
        })
    }
}


module.exports.viewUser = async (req, res) => {
    try {
        jwt.verify(req.token, process.env.JWT_KEY, (err, authorizedData) => {
            if (err) {
                res.status(403).json({
                    message: "protected Route"
                });
            } else {
                if (authorizedData.hasOwnProperty("user")) {
                    res.status(200).send(authorizedData);
                } else {
                    res.status(401).json({ message: "Unauthorized access to user's profile" });
                }
            }
        });
    } catch (e) {
        res.status(401).json({ name: e.name, message: e.message });
    }
}

module.exports.getName = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json({ name: user.name })
    } catch (e) {
        res.status(401).json({ name: e.name, message: e.message });
    }
}
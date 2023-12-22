if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const courseRoutes = require("./routes/course")
const ratingRoutes = require("./routes/rating")

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user")
const cors = require("cors");

const dbUrl = process.env.DB_URL;
const port = process.env.PORT || 3000;


mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("connection open!!!!");
});

const app = express();


app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/course", courseRoutes);
app.use("/comment", commentRoutes);
app.use("/rating", ratingRoutes);


app.get("/", (req, res) => {
    res.status(200).json({ home: "home" });
});

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});

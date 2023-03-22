const express = require("express");
const { urlencoded, json } = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { connectDB } = require("./config/db");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const School = require("./models/school");
const Course = require("./models/course");
const Review = require("./models/review");
const User = require("./models/user");

// Connect to MongoDB database
connectDB();

// Tools
app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(urlencoded({ extended: false }));

// Routers
app.use("/api/course", require("./routes/courseRoutes"));
app.use("/api/review", require("./routes/reviewRoutes"));
app.use("/api/school", require("./routes/schoolRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/post", require("./routes/postRoutes"));
app.use("/api/reply", require("./routes/replyRoutes"));

app.use("/api/resetData", async (req, res) => {
  /* 
    password is password or password<number after role in email> 
    user, admin, editor => password
    user2 => password2
    */
  const userData = [
    {
      _id: new mongoose.Types.ObjectId("64189d2acd26c3cc9c90d6b7"),
      username: "admin@gmail.com",
      password: "$2b$10$7b8NpYFXKctDpwc09cWwEe93zDdW1COMFVNdUzbtzbY50txHceH4i",
      role: "admin",
    },
    {
      _id: new mongoose.Types.ObjectId("64189dde80a7b8b4d27b5b34"),
      username: "editor@gmail.com",
      password: "$2b$10$4lONp61WcBeOGcTWABKJCOZX1biUkz1yEuV8PDijBi1GlW5y7aIEa",
      role: "editor",
    },
    {
      _id: new mongoose.Types.ObjectId("6415d1d29cacc8e72d270f90"),
      username: "user@gmail.com",
      password: "$2b$10$kbvY5Yo.jPBu/ZKg2P3ji.LQLmSY7G06JTXvqy2LHlVBBevNQ09TW",
      role: "user",
    },
    {
      _id: new mongoose.Types.ObjectId("64161d8e9945dcf1c5ebe663"),
      username: "user2@gmail.com",
      password: "$2b$10$7WCjd/BJbGDH5zMwMq8N7OJnCTxddSaSX7aXcr8h9heE/.NErdPUC",
      role: "user",
    },
    {
      _id: new mongoose.Types.ObjectId("641623c1e331c6b275d91c58"),
      username: "user3@gmail.com",
      password: "$2b$10$/5Fr2/s2NFkgGRPq9dn6wOpDMjX4Zi5562W978CpvBKzxJayykaeq",
      role: "user",
    },
  ];

  const schoolData = [
    {
      _id: new mongoose.Types.ObjectId("6410c8b12c4cfa3a85862ace"),
      schoolName: "Centennial College",
      schoolType: "College",
      location: "Toronto, Ontario",
      description:
        "Centennial College is a public college located in Toronto, Ontario, Canada. It offers over 260 diploma, certificate, and degree programs.",
    },
    {
      _id: new mongoose.Types.ObjectId("6410c8cc2c4cfa3a85862ad0"),
      schoolName: "University of Toronto",
      schoolType: "University",
      location: "Toronto, Ontario",
      description:
        "The University of Toronto is a public research university located in Toronto, Ontario, Canada. It was founded by royal charter in 1827 as King's College, the first institution of higher learning in the colony of Upper Canada.",
    },
  ];

  const courseData = [
    {
      _id: new mongoose.Types.ObjectId("6410c9852c4cfa3a85862ad9"),
      courseName: "Computer Programming",
      courseCode: "COMP123",
      description:
        "This course provides an introduction to programming concepts and practices using a high-level language such as Python or Java.",
      schoolId: new mongoose.Types.ObjectId("6410c8b12c4cfa3a85862ace"),
    },
    {
      _id: new mongoose.Types.ObjectId("6410c9b32c4cfa3a85862add"),
      courseName: "Graphic Design Fundamentals",
      courseCode: "GD101",
      description:
        "This course introduces students to the principles of graphic design, including typography, color theory, composition, and layout.",
      schoolId: new mongoose.Types.ObjectId("6410c8b12c4cfa3a85862ace"),
    },
    {
      _id: new mongoose.Types.ObjectId("6410c9ed2c4cfa3a85862ae2"),
      courseName: "Introduction to Psychology",
      courseCode: "PSY100",
      description:
        "This course provides an overview of the scientific study of human behavior and mental processes.",
      schoolId: new mongoose.Types.ObjectId("6410c8cc2c4cfa3a85862ad0"),
    },
    {
      _id: new mongoose.Types.ObjectId("6410ca0e2c4cfa3a85862ae5"),
      courseName: "Canadian History Since Confederation",
      courseCode: "HIS245",
      description:
        "This course provides a survey of Canadian history from Confederation to the present day. Topics covered include the evolution of Canadian political institutions and Canada's role in international affairs.",
      schoolId: new mongoose.Types.ObjectId("6410c8cc2c4cfa3a85862ad0"),
    },
  ];

  const reviewData = [
    {
      _id: new mongoose.Types.ObjectId("6410c622c92e47e4fa4baab7"),
      professorName: "John Smith",
      mainTopics: "Basic knowledge on computer science and coding with C#",
      comments:
        "Professor Smith was knowledgeable and approachable. He provided clear explanations of difficult topics and made himself available for office hours. The only downside was that the course workload was quite heavy.",
      effectiveness: 4,
      courseId: new mongoose.Types.ObjectId("6410c9852c4cfa3a85862ad9"),
      userId: new mongoose.Types.ObjectId("6415d1d29cacc8e72d270f90"),
    },
    {
      _id: new mongoose.Types.ObjectId("6410cb282c4cfa3a85862aef"),
      professorName: "Jules Doe",
      mainTopics: "Composition, Layout",
      comments:
        "I found this course to be very informative and practical. The assignments gave me the opportunity to develop my design skills and try out different techniques. Professor Doe was approachable and responsive to questions and concerns. I learned a lot about the importance of composition and layout in creating effective designs.",
      effectiveness: 5,
      courseId: new mongoose.Types.ObjectId("6410c9b32c4cfa3a85862add"),
      userId: new mongoose.Types.ObjectId("64161d8e9945dcf1c5ebe663"),
    },
    {
      _id: new mongoose.Types.ObjectId("6410cb612c4cfa3a85862af2"),
      professorName: "Jane Smith",
      mainTopics: "Typography, Color Theory",
      comments:
        "This was an good course that provided a solid foundation in graphic design principles. Professor Smith was knowledgeable and engaging, and provided helpful feedback on our assignments. I particularly enjoyed the unit on typography and the use of typefaces to convey different moods and meanings.",
      effectiveness: 3,
      courseId: new mongoose.Types.ObjectId("6410cc982c4cfa3a85862b01"),
      userId: new mongoose.Types.ObjectId("641623c1e331c6b275d91c58"),
    },
    {
      _id: new mongoose.Types.ObjectId("6410cc982c4cfa3a85862b01"),
      professorName: "Sarah Lee",
      mainTopics: "Social Behavior, Abnormal Psychology",
      comments:
        "I really enjoyed this course and found it to be very interesting and engaging. Professor Lee was knowledgeable and passionate about the subject matter, and presented the material in a way that was easy to follow. I appreciated the opportunity to learn about different topics in psychology, including social behavior and abnormal psychology. The assignments and exams were fair and allowed me to demonstrate my understanding of the material.",
      effectiveness: 5,
      courseId: new mongoose.Types.ObjectId("6410c9ed2c4cfa3a85862ae2"),
      userId: new mongoose.Types.ObjectId("6415d1d29cacc8e72d270f90"),
    },
  ];

  try {
    // user
    await User.deleteMany();
    await User.insertMany(userData);

    // school
    await School.deleteMany();
    await School.insertMany(schoolData);

    // course
    await Course.deleteMany();
    await Course.insertMany(courseData);

    // review
    await Review.deleteMany();
    await Review.insertMany(reviewData);

    res.status(200).json({
      message: "Successfully reset data",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(port, () =>
  console.log(`RightCourse - Server running on port: ${port}`)
);

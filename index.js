const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoute");
const app = express();
require("dotenv").config();
dbConnect();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello Server , I am Niraj");
});

app.use("/api/user/", userRoute);
app.use("/api/post/", postRoute);
app.use("/api/comments/", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const express = require("express"); // Import Express
const mongoose = require("mongoose"); //Import Mongoose
const userRouter = require("./routes/users"); // Route File For Users
const postsRouter = require("./routes/posts"); // Route File For Posts

// Read From Enviroment OR Set The Defualt Value (4000)
const PORT = process.env.PORT || 4000;

// Create Express Application
const app = express();

// Connect To Mongodb
mongoose.connect(
  "mongodb://localhost:27017/blogSystem",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (!err) console.log("Connection Start with mongoDB");
    else console.log(err);
  }
);

app.use(express.json()); //middleware to parse the json sfile to hold the req.body

// middleware (application-level)
app.use(function log(req, res, next) {
  //   console.log(new Date(), req.method, req.url);
  console.log("error while logging");
  next();
});

// testing error handling
app.get("/user", function(req, res, next) {
  throw new Error("Oops!");
});

// Use Routes
app.use("/users", userRouter);
app.use("/posts", postsRouter);

// error handling middleware function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("error!");
});

// Listen on PORT or Display Error
app.listen(PORT, err => {
  if (!err) console.log(`started server on port ${PORT}`);
});

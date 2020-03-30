const express = require ('express'); // Import Express Framework
const mongoose = require('mongoose'); //Import Mongoose
const userRouter = require('./routes/users'); // Import Exported Route File For Users
const postsRouter = require('./routes/posts'); // Import Exported Route File For Posts

// Read From Enviroment OR Set The Defualt Value (4000)
const PORT = process.env.PORT || 4000;

// Create Express Application
const app = express();

// Connect To Mongodb
mongoose.connect('mongodb://localhost:27017/blogSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (!err) console.log('Connection Start with mongoDB')
    else console.log(err)
});

app.use(express.json()); //middleware to parse the json sfile to hold the req.body

// Use Routes
app.use('/users', userRouter);
app.use('/posts', postsRouter);

// Listen on PORT or Display Error
app.listen(PORT, (err) => {
    if (!err) console.log(`started server on port ${PORT}`);
});
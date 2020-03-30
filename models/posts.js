const mongoose = require('mongoose'); // Import mongoose

// Schema 
const postSchema = new mongoose.Schema ({
    title: { type: String, required: true},
    content: { type: String, required: true},
});

// Craeting Model
const PostModel = mongoose.model('Post', postSchema);

// Export Module
module.exports = PostModel;
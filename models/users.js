const mongoose = require('mongoose'); // Import mongoose

// Schema 
const userSchema = new mongoose.Schema ({
    firstName: { type:String, required: true, minLength: 5 },
    lastName: { type:String, required: true },
    email: { type:String, required: true, unique: true, match: /.+@.+\..+/ },
    password: { type:String, minLength: 6 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

// Craeting Model
const UserModel = mongoose.model('User',userSchema);

// Export Module
module.exports = UserModel;
const mongoose = require('mongoose'); // Import mongoose
const bcrypt = require('bcrypt');

// Schema 
const userSchema = new mongoose.Schema ({
    firstName: { type:String, required: true, minLength: 5 },
    lastName: { type:String, required: true },
    email: { type:String, required: true, unique: true, match: /.+@.+\..+/ },
    password: { type:String, minLength: 6 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

userSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, saltRounds, (error, hashedPassword) => {
            if (error) {
                next(error);
            } else {
                this.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

// instance method
// userSchema.methods.getFullName = function () {
//     return this.firstName + ' ' + this.lastName
// }

// userSchema.statics.getStudentsByFirstName = function (firstName, cb) {
//     this.find = ({ firstName }, cb )
// }

// Craeting Model
const UserModel = mongoose.model('User',userSchema);

const user = new UserModel({
    firstName: "eman",
    lastName: "magdy",
    email: "e@e.com",
    password: "123456"
});

user.getFullName();

// Export Module
module.exports = UserModel;
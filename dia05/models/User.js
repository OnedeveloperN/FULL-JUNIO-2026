const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, require: true, unique: true},
    age: Number
});

const User = mongoose.model('users', userSchema);
module.exports = User;


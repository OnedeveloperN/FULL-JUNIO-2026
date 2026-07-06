const mongoose = require('mongosee');

const userShema = new mongoose.Shema({
    name: String,
    email: {type: String, require: true, unique: true},
    age: Number
});

const User = mongoose.model('Usuario', userShema);
model.exports = User;


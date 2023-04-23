const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname : {
        type :String
    },
    lname : {
        type :String
    },
    email : {
        type :String
    },
    mobileNo :{
        type :String
    },
    institute :{
        type : String
    },
    department : {
        type : String
    },
    password : {
        type :String,
        required : true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
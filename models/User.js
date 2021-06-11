const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        // required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        maxlength: 10
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("user", UserSchema);

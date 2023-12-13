const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    jwtToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String,
        required: true
    },
    browserFingerprint: {
        type: String,
        required: true
    }
});

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    admin: {
        type: Boolean,
        default: false
    },
    sessions: [sessionSchema]
});

const AccountModel = mongoose.model("account", accountSchema, "users");

module.exports = AccountModel;

mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    confirm_password: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

const login_schema = new mongoose.model("User_login", loginSchema);

module.exports = login_schema;
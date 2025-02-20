const mongoose = require("mongoose");

const connectDB = mongoose.connect("mongodb://localhost:27017/user"
).then(() => {
    console.log("success")
}
)

module.exports = connectDB;
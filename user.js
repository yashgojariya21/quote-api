const express = require("express");
const app = express();
require("./db/db")

const PORT = process.env.PORT || 7000;

const user_router = require("./routes/user")

app.use(express.json());

app.get("/", (req, res) => {
    res.send("home page")
})

app.use("/user", user_router);

app.use("/register", user_router);

app.listen(PORT, () => {
    console.log(`seerver listed at ${PORT}`);
})
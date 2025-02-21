const express = require("express");
const cors = require("cors");
app.use(cors())
const app = express();
require("./db/db")

const PORT = process.env.PORT || 7000;


const user_router = require("./routes/user")

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Login Api page")
})

app.use("/register", user_router);

app.listen(PORT, () => {
    console.log(`seerver listed at ${PORT}`);
})
const express = require("express");
const cors = require("cors");
const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsConfig))
app.use(cors(corsConfig))
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
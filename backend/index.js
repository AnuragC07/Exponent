const express = require("express");
const mongoose = require("mongoose");
const port = 8000;

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello from exponent backend");
})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
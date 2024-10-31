const express = require("express");
const mongoose = require("mongoose");
const port = 8000;
const cors = require("cors");
const dotenv = require('dotenv');
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/monthlybudgetRoutes");
const totalAmountRoutes = require("./routes/totalAmountRoutes");
const userRoutes = require("./routes/userRoutes");



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())
app.use('/', transactionRoutes);
app.use('/budget', budgetRoutes);
app.use('/api/total', totalAmountRoutes);
app.use('/', userRoutes);
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);


// app.get("/", (req, res) => {
//     return res.send("Hello from exponent backend");
// })



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
        console.log(`Server is running on port : ${port}`);
    });
})
    .catch((error) => {
        console.log("Error connecting to server: ", error);
    });
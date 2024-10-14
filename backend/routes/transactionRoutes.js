const express = require("express");
const router = express.Router();
const cors = require("cors");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");


//apis

//show all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.status(200).json({
            data: transactions,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//
router.get("/transactions", async (req, res) => {
    try {
        const { month, year } = req.query; // Extract month and year from query params

        const transactions = await Transaction.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date" }, parseInt(month)] },
                    { $eq: [{ $year: "$date" }, parseInt(year)] },
                ],
            },
        });

        res.status(200).json({ data: transactions });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
});

//create a transaction
router.post('/', async (req, res) => {
    try {
        if (!req.body.amount || !req.body.type || !req.body.category || !req.body.source) {
            return res.status(400).json({
                message: "Please enter all fields",
            });
        }
        const newTransaction = {
            amount: req.body.amount,
            type: req.body.type,
            source: req.body.source,
            date: req.body.date,
            category: req.body.category,
        };
        const transaction = await Transaction.create(newTransaction);
        return res.status(200).json(transaction);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
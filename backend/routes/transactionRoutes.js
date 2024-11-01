const express = require("express");
const router = express.Router();
const cors = require("cors");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const { jwtAuth, extractUsernameFromToken } = require("../jwt");

//apis

//show all transactions
//this is not generally needed because it fetches all records in the db
router.get('/', jwtAuth, extractUsernameFromToken, async (req, res) => {
    try {
        const transactions = await Transaction.find({ account: req.username });
        res.status(200).json({
            data: transactions,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//normal get request to fetch data for current logged in user account
router.get("/transactions", jwtAuth, extractUsernameFromToken, async (req, res) => {
    try {
        const { month, year } = req.query; // Extract month and year from query params

        const transactions = await Transaction.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date" }, parseInt(month)] },
                    { $eq: [{ $year: "$date" }, parseInt(year)] }
                ]
            },
            account: req.username
        });

        res.status(200).json({ data: transactions });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
});

//create a transaction
router.post('/', jwtAuth,
    extractUsernameFromToken, async (req, res) => {
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
                account: req.username,
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
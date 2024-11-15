const express = require("express");
const router = express.Router();
const cors = require("cors");
const Budget = require("../models/budgetModel");
const { jwtAuth, extractUsernameFromToken } = require("../jwt");

// router.get('/', async (req, res) => {
//     try {
//         const budget = await Budget.find({});
//         res.status(200).json({
//             data: budget,
//         });
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

router.get("/budget", jwtAuth, extractUsernameFromToken, async (req, res) => {
    const { month } = req.query;  // Extract the month from the query params
    console.log("Fetching budget for:", { username: req.username, month });

    try {
        const budget = await Budget.findOne({
            account: req.username,  // Filter by the logged-in user's account
            month: month,           // Match the month field (no need for a year)
        });

        if (budget) {
            console.log("Found budget:", budget.amount);
            res.status(200).json({ amount: budget.amount });
        } else {
            console.log("No budget found for the given parameters.");
            res.status(200).json({ amount: 0 });  // Return 0 if no budget is found
        }
    } catch (error) {
        console.error("Error fetching budget:", error);
        res.status(500).json({ message: "Failed to fetch budget" });
    }
});




router.post('/budget', jwtAuth, extractUsernameFromToken, async (req, res) => {
    try {
        if (!req.body.amount || !req.body.month) {
            return res.status(400).json({
                message: "Please enter all fields",
            });
        }
        const newBudget = {
            amount: req.body.amount,
            month: req.body.month,
            account: req.username
        };
        const budget = await Budget.create(newBudget);
        return res.status(200).json(budget);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
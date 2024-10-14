const express = require("express");
const router = express.Router();
const cors = require("cors");
const Budget = require("../models/budgetModel");


router.get('/', async (req, res) => {
    try {
        const budget = await Budget.find({});
        res.status(200).json({
            data: budget,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/budget", async (req, res) => {
    const { month, year } = req.query;

    try {
        const budget = await Budget.findOne({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date" }, parseInt(month)] },
                    { $eq: [{ $year: "$date" }, parseInt(year)] },
                ],
            },
        });

        res.status(200).json({ amount: budget ? budget.amount : 0 });
    } catch (error) {
        console.error("Error fetching budget:", error);
        res.status(500).json({ message: "Failed to fetch budget" });
    }
});

router.post('/', async (req, res) => {
    try {
        if (!req.body.amount || !req.body.month) {
            return res.status(400).json({
                message: "Please enter all fields",
            });
        }
        const newBudget = {
            amount: req.body.amount,
            month: req.body.month,
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
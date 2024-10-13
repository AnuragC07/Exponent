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
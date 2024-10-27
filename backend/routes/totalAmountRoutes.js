// routes/totalAmountRoutes.js
const express = require("express");
const router = express.Router();
const totalAmount = require("../models/totalAmount");

// GET /api/total
router.get('/', async (req, res) => {
    try {
        const totalamount = await totalAmount.find({});
        res.status(200).json({
            data: totalamount,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/total
router.post('/', async (req, res) => {
    try {
        const { amount } = req.body;

        if (amount == null || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount is required and must be a number' });
        }

        const newTotalAmount = new totalAmount({ amount });
        await newTotalAmount.save();

        res.status(201).json({
            message: 'Total amount created successfully',
            data: newTotalAmount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/total/update
router.put('/update', async (req, res) => {
    try {
        const { type, amount } = req.body;

        // Validate inputs
        if (!type || amount == null) {
            return res.status(400).json({
                message: 'Type and amount are required'
            });
        }

        const numAmount = Number(amount);
        if (isNaN(numAmount)) {
            return res.status(400).json({
                message: 'Amount must be a valid number'
            });
        }

        // Find the most recent total amount document
        const totalAmountDoc = await totalAmount.findOne().sort({ createdAt: -1 });

        if (!totalAmountDoc) {
            return res.status(404).json({
                message: 'No total amount record found'
            });
        }

        // Update based on transaction type
        if (type === 'earning') {
            totalAmountDoc.amount += numAmount;
        } else if (type === 'expense') {
            totalAmountDoc.amount -= numAmount;
        } else {
            return res.status(400).json({
                message: 'Invalid transaction type. Must be "earning" or "expense"'
            });
        }

        await totalAmountDoc.save();

        res.status(200).json({
            message: 'Total amount updated successfully',
            data: totalAmountDoc
        });

    } catch (error) {
        console.error('Update total amount error:', error);
        res.status(500).json({
            message: error.message || 'Error updating total amount'
        });
    }
});

module.exports = router;
// routes/totalAmountRoutes.js
const express = require("express");
const router = express.Router();
const totalAmount = require("../models/totalAmount");
const { jwtAuth, extractUsernameFromToken } = require("../jwt");
// GET /api/total
router.get('/', jwtAuth, extractUsernameFromToken, async (req, res) => {
    try {
        const data = await totalAmount.find({ account: req.username })
            .sort({ createdAt: -1 }) // Sort by latest first
            .limit(1); // Get only the latest entry

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// POST /api/total
router.post('/', jwtAuth,
    extractUsernameFromToken, async (req, res) => {
        try {
            if (!req.body.amount || !req.username) {
                return res.status(400).json({
                    message: "Please enter all fields",
                });
            }

            // if (amount == null || typeof amount !== 'number') {
            //     return res.status(400).json({ message: 'Amount is required and must be a number' });
            // }

            const newTotalAmount = {
                amount: req.body.amount,
                account: req.username

            };
            const totalAm = await totalAmount.create(newTotalAmount);
            console.log("Account from token:", req.account);


            res.status(201).json({
                totalAm

            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

// PUT /api/total/update
router.put('/update', jwtAuth,
    extractUsernameFromToken, async (req, res) => {
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
            const totalAmountDoc = await totalAmount.findOne({ account: req.username });

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
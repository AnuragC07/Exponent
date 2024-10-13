const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema(
    {
        amount: { type: Number, required: true },
        month: { type: String, required: true },
    },
    { timestamps: true }
);

const budget = mongoose.model('budget', budgetSchema);
module.exports = budget;
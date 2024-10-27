const mongoose = require("mongoose");

const totalAmountSchema = mongoose.Schema(
    {
        amount: { type: Number, required: true }
    },
    { timestamps: true }
);

const totalAmount = mongoose.model('TotalAmount', totalAmountSchema);
module.exports = totalAmount;
const mongoose = require("mongoose");

const totalAmountSchema = mongoose.Schema(
    {
        amount: { type: Number, required: true },
        account: { type: String }
    },
    { timestamps: true }
);

const totalAmount = mongoose.model('TotalAmount', totalAmountSchema);
module.exports = totalAmount;
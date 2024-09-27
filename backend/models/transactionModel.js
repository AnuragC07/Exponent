const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
    {
        amount : { type: Number, required: true },
        type : { type: String, required: true },
        source: { type: String, required: true },
        date: { type: Date, default: Date.now },
        category: { type: String, required: true },
    },
    { timestamps: true }
);

const transaction = mongoose.model('transaction', transactionSchema);
module.exports = transaction;
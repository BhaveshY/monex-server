
const { Number } = require('mongoose');
const { Decimal128 } = require('mongoose');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    categories: { type: Array, required: true },
    amount: { type: Decimal128, required: true },
    type: { type: Number, required: true },
    user: { type: String, required: true }
}, { timestamps: true })

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
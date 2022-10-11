const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);

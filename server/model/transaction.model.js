import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["cash", "card", "bank_transfer", "cheque", "upi"],
    required: true,
  },
  category: {
    type: String,
    enum: ["income", "expense", "investment"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

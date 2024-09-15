import Transaction from "../model/transaction.model.js";
import User from "../model/user.model.js";
import { ObjectId } from "mongodb"; // Make sure to import ObjectId i

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.log(error);
        throw new Error("Internal server error");
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const transaction = await Transaction.findOne({ _id: transactionId });
        if (!transaction) throw new Error("Transaction not found");
        return transaction;
      } catch (error) {
        console.log(error);
        throw new Error("Internal server error");
      }
    },
  },
  Transaction: {
    user: async (parent) => {
      const userId = parent.userId;
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error getting user:", err);
        throw new Error("Error getting user");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = context.getUser()._id;
        const { name, amount, paymentType, category, date } = input;
        if (!amount || !name || !paymentType || !category || !date) {
          throw new Error("All fields are required");
        }
        const newTransaction = new Transaction({
          userId,
          amount,
          name,
          paymentType,
          category,
          date,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.log(error);
        throw new Error("Internal server error");
      }
    },
    updateTransaction: async (_, { input }, context) => {
      try {
        const user = context.getUser();
        const transactionID = input.transactionId;
        const transaction = await Transaction.findOne({ _id: transactionID });

        if (!transaction) throw new Error("Transaction not found");
        if (!transaction.userId.equals(user._id)) throw new Error("Unauthorized");

        const { amount, name, paymentType, category, date } = input;
        if (amount) transaction.amount = amount;
        if (name) transaction.name = name;
        if (paymentType) transaction.paymentType = paymentType;
        if (category) transaction.category = category;
        if (date) transaction.date = date;

        const updatedTransaction = await transaction.save();
        return updatedTransaction; // Ensure to return the updated transaction
      } catch (error) {
        console.log(error);
        throw new Error("Internal server error");
      }
    },

    deleteTransaction: async (_, { transactionId }, context) => {
      try {
        const user = context.getUser();
        if (!user) throw new Error("Unauthorized");

        const transaction = await Transaction.findOne({ _id: transactionId });
        if (!transaction) throw new Error("Transaction not found");

        console.log("User:", user);
        console.log("Transaction:", transaction);

        if (!transaction.userId.equals(user._id)) {
          console.log("User ID from transaction:", transaction.userId);
          console.log("User ID from context:", user._id);
          throw new Error("Unauthorized: User does not own this transaction");
        }

        await Transaction.deleteOne({ _id: transactionId });
        return transaction;
      } catch (error) {
        console.error("Error in deleteTransaction:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
};

export default transactionResolver;

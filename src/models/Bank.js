const mongoose = require('mongoose');

// DEFINING THE SCHEMA FOR THE BANK COLLECTION IN DB
const bankSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Reference to the User model as a string
  totalBalance: { type: Number, required: true },
  thisMonth: {
    totalDeposits: { type: Number, required: true },
    totalWithdrawals: { type: Number, required: true },
    netBalance: { type: Number, required: true }
  },
  newTransactions: [
    {
      date: { type: Date, required: true },
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      type: { type: String, enum: ['deposit', 'withdrawal'], required: true }
    }
  ]
});

// Check if the model already exists before defining it
const Bank = mongoose.models.Bank || mongoose.model('Bank', bankSchema, 'bank');

module.exports = Bank;


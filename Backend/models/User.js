const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  transactions: [
    {
      type: { type: String },
      amount: { type: Number },
      date: { type: String },
      status: { type: String },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

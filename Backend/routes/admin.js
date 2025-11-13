const express = require("express");
const router = express.Router();

// ✅ Test route to confirm it's working
router.get("/test", (req, res) => {
  res.json({ message: "Admin route is working" });
});

// ✅ Your actual update-balance route
router.post("/update-balance", async (req, res) => {
  const { email, amount, type } = req.body;

  if (!email || !amount || !type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const User = require("../models/User");
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (type === "deposit") {
      user.balance += amount;
      user.transactions.push({
        type: "Deposit",
        amount,
        date: new Date().toLocaleString(),
        status: "Completed"
      });
    } else if (type === "withdraw") {
      user.balance -= amount;
      user.transactions.push({
        type: "Withdraw",
        amount,
        date: new Date().toLocaleString(),
        status: "Completed"
      });
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    await user.save();
    res.status(200).json({
      message: "Balance updated successfully",
      user: {
        name: user.name,
        email: user.email,
        balance: user.balance,
        transactions: user.transactions.slice(-5)
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// ✅ Export the router
module.exports = router;
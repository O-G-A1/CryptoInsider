const express = require("express");
const router = express.Router();

// ✅ Test route to confirm it's working
router.get("/test", (req, res) => {
  res.json({ message: "Admin route is working" });
});

// ✅ Update balance route (deposit/withdraw)
router.post("/update-balance", async (req, res) => {
  const { email, amount, type, status, reason } = req.body;

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
        status: "Completed", // deposits are always completed
      });
    } else if (type === "withdraw") {
      user.balance -= amount;
      user.transactions.push({
        type: "Withdraw",
        amount,
        date: new Date().toLocaleString(),
        status: status || "Pending", // ✅ use admin-selected status
        reason: status === "failed" ? reason : null, // ✅ save reason only if failed
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
        transactions: user.transactions.slice(-5), // return last 5
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// ✅ Remove transaction route
router.post("/remove-transaction", async (req, res) => {
  const { email, index } = req.body;

  if (!email || index === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const User = require("../models/User");
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const txToRemove = user.transactions[index];
    if (!txToRemove) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Roll back balance depending on type
    if (txToRemove.type === "Deposit") {
      user.balance -= txToRemove.amount;
    } else if (txToRemove.type === "Withdraw") {
      user.balance += txToRemove.amount;
    }

    // Remove transaction
    user.transactions.splice(index, 1);

    await user.save();

    res.status(200).json({
      message: `${txToRemove.type} removed successfully`,
      user: {
        name: user.name,
        email: user.email,
        balance: user.balance,
        transactions: user.transactions.slice(-5),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// ✅ View user info route
router.post("/get-user", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const User = require("../models/User");
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User fetched successfully",
      user: {
        name: user.name,
        email: user.email,
        balance: user.balance,
        transactions: user.transactions,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// ✅ Export the router
module.exports = router;

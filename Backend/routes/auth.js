const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer'); // ✅ add nodemailer

const router = express.Router();

// =======================
// Signup route
// =======================
router.post('/signup', async (req, res) => {
  console.log("Signup route hit"); // Debug log
  console.log("Request body:", req.body);

  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with initial balance and transactions
    const user = new User({
      name,
      email,
      password: hashedPassword,
      balance: 0,
      transactions: []
    });

    await user.save();

    // ✅ Send email notification to admin
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail", // or Outlook, etc.
        auth: {
          user: process.env.ADMIN_EMAIL, // your admin email
          pass: process.env.ADMIN_PASS   // your email password or app password
        }
      });

      const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: "bryanmears121@gmail.com", // where you want notifications
        subject: "New User Signup",
        text: `A new user signed up:\nName: ${name}\nEmail: ${email}`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending signup email:", err);
        } else {
          console.log("Signup email sent:", info.response);
        }
      });
    } catch (mailErr) {
      console.error("Email notification error:", mailErr.message);
    }

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// =======================
// Login route
// =======================
router.post('/login', async (req, res) => {
  console.log("Login route hit"); // Debug log
  console.log("Request body:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // ✅ Return token + user details
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance || 0,
        transactions: user.transactions || []
      }
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
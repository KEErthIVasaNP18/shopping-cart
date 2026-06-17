const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const postRoutes = require('./routes/post');
const categoryRoutes = require('./routes/category');
const otpStore = require('./otpStore');
const nodemailer = require('nodemailer')
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now()
    });

    res.status(200).json(order);
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Verify Payment
app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    res.status(200).json({ message: 'Payment successful' });
  } else {
    res.status(400).json({ message: 'Payment verification failed' });
  }
});


app.post('/sendOtp', async (req, res) => {
  let { email } = req.body;
  if (email) email = email.trim().toLowerCase();

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  const mailOptions = {
    from: '"OTP Login" <your-email@gmail.com>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);

    // ✅ Store OTP in memory
    otpStore[email] = {
      otp: otp.toString(),
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    };

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Route to verify OTP
app.post('/verifyOtp', (req, res) => {
  let { email, otp } = req.body;
  if (email) email = email.trim().toLowerCase();
  if (otp) otp = otp.trim();

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
  }

  const isExpired = Date.now() > record.expiresAt;
  const isMatch = otp === record.otp;

  if (isExpired) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
  }

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  delete otpStore[email]; // clear after successful verification
  return res.status(200).json({ message: 'OTP verified successfully' });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

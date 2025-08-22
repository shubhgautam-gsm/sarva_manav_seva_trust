// import { Router } from 'express';
// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import Donation from '../models/Donation.js';

// const router = Router();

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // Create order
// router.post('/create-order', async (req, res) => {
//   try {
//     const { amount, donorName, donorEmail, donorPhone, notes } = req.body;

//     if (!amount || amount < 100) {
//       return res.status(400).json({ message: 'Amount must be at least ₹1' });
//     }

//     const options = {
//       amount: amount * 100, // Convert to paisa
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         donorName: donorName || '',
//         donorEmail: donorEmail || '',
//         donorPhone: donorPhone || '',
//         purpose: notes || 'General donation'
//       }
//     };

//     const order = await razorpay.orders.create(options);

//     // Save to database
//     const donation = await Donation.create({
//       razorpayOrderId: order.id,
//       amount: amount,
//       donorName,
//       donorEmail,
//       donorPhone,
//       notes,
//       status: 'created'
//     });

//     res.json({
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       keyId: process.env.RAZORPAY_KEY_ID
//     });
//   } catch (error) {
//     console.error('Payment order creation failed:', error);
//     res.status(500).json({ message: 'Failed to create order' });
//   }
// });

// // Verify payment
// router.post('/verify-payment', async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     // Verify signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest('hex');

//     if (expectedSignature === razorpay_signature) {
//       // Update donation status
//       await Donation.findOneAndUpdate(
//         { razorpayOrderId: razorpay_order_id },
//         {
//           razorpayPaymentId: razorpay_payment_id,
//           razorpaySignature: razorpay_signature,
//           status: 'paid'
//         }
//       );

//       res.json({ status: 'success', message: 'Payment verified successfully' });
//     } else {
//       // Mark as failed
//       await Donation.findOneAndUpdate(
//         { razorpayOrderId: razorpay_order_id },
//         { status: 'failed' }
//       );

//       res.status(400).json({ status: 'failure', message: 'Invalid signature' });
//     }
//   } catch (error) {
//     console.error('Payment verification failed:', error);
//     res.status(500).json({ message: 'Payment verification failed' });
//   }
// });

// export default router;
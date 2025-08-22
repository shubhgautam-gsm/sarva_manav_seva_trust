// server/src/routes/payments.js
// ESM-safe, lazy-loads payment SDKs and never crashes when env is missing

import express from 'express';
import crypto from 'crypto';

const router = express.Router();
const GATEWAY = (process.env.PAYMENT_GATEWAY || '').toLowerCase();

/**
 * Utility - lazy instantiate Razorpay client when needed.
 * Returns an object { client, error } where client may be undefined if keys missing.
 */
async function getRazorpayClient() {
  const key = process.env.RP_KEY_ID;
  const secret = process.env.RP_KEY_SECRET;
  if (!key || !secret) {
    return { client: null, error: 'Razorpay keys missing. Set RP_KEY_ID and RP_KEY_SECRET in env.' };
  }
  const { default: Razorpay } = await import('razorpay');
  const client = new Razorpay({ key_id: key, key_secret: secret });
  return { client, error: null };
}

/**
 * Utility - lazy instantiate Stripe client when needed.
 */
async function getStripeClient() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return { client: null, error: 'Stripe secret key missing. Set STRIPE_SECRET_KEY in env.' };
  }
  const { default: Stripe } = await import('stripe');
  const client = new Stripe(secret, { apiVersion: '2022-11-15' });
  return { client, error: null };
}

/**
 * Create payment order / payment intent
 * POST /api/payment/create
 * body: { amount, currency, receipt }
 */
router.post('/create', express.json(), async (req, res) => {
  try {
    const { amount, currency: reqCurrency, receipt } = req.body;
    if (!amount || isNaN(amount)) return res.status(400).json({ message: 'Invalid amount' });

    if (GATEWAY === 'razorpay') {
      const { client, error } = await getRazorpayClient();
      if (error) return res.status(500).json({ message: error });

      const currency = reqCurrency || 'INR';
      const options = {
        amount: Math.round(Number(amount) * 100), // paise
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
      };
      const order = await client.orders.create(options);
      return res.json({ gateway: 'razorpay', order });
    }

    if (GATEWAY === 'stripe') {
      const { client, error } = await getStripeClient();
      if (error) return res.status(500).json({ message: error });

      const currency = reqCurrency || 'usd';
      const intent = await client.paymentIntents.create({
        amount: Math.round(Number(amount) * 100),
        currency,
        metadata: { receipt: receipt || `rcpt_${Date.now()}` },
      });
      return res.json({ gateway: 'stripe', client_secret: intent.client_secret, intent_id: intent.id });
    }

    return res.status(400).json({ message: 'Payment gateway not configured (env PAYMENT_GATEWAY)' });
  } catch (err) {
    console.error('Payment create error:', err);
    return res.status(500).json({ message: 'Payment create failed', error: err.message || err });
  }
});

/**
 * Razorpay verification endpoint (client -> server)
 * POST /api/payment/verify
 * body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */
router.post('/verify', express.json(), async (req, res) => {
  try {
    if (GATEWAY !== 'razorpay') {
      return res.status(400).json({ message: 'This endpoint is for Razorpay verification only.' });
    }
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // We don't need the Razorpay client to verify signature; use RP_KEY_SECRET
    const secret = process.env.RP_KEY_SECRET;
    if (!secret) return res.status(500).json({ message: 'Razorpay secret missing on server.' });

    const generated = crypto.createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated === razorpay_signature) {
      // TODO: mark payment as paid in DB
      return res.json({ success: true });
    }
    console.warn('Signature mismatch:', { generated, received: razorpay_signature });
    return res.status(400).json({ success: false, message: 'Signature mismatch' });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ message: 'Verification failed', error: err.message });
  }
});

/**
 * Stripe webhook handler (requires raw body mounting in index.js)
 * POST /api/payment/webhook
 * NOTE: this handler is exported so you can mount it with express.raw
 */
async function stripeWebhookHandler(req, res) {
  try {
    const { client, error } = await getStripeClient();
    if (error) {
      console.error('Stripe webhook called but client missing:', error);
      return res.status(500).send('Stripe not configured');
    }
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = client.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object;
      // TODO: mark payment as paid in DB
      console.log('Payment succeeded:', intent.id);
    }
    // acknowledge
    return res.json({ received: true });
  } catch (err) {
    console.error('Stripe webhook handler error:', err);
    return res.status(500).send('Internal error');
  }
}

export default router;
export { stripeWebhookHandler };

import { createPaymentIntent } from '../services/stripeService.js';

export const stripePayment = async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }

  const paymentIntent = await createPaymentIntent(amount);

  res.json({
    clientSecret: paymentIntent.client_secret,
  });
};

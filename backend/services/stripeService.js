// services/stripeService.js
import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (amount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // convert to cents
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return paymentIntent;
};

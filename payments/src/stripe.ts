import stripe from 'stripe';

const stripeClient = new stripe(process.env.STRIPE_KEY!);

export { stripeClient as stripe };
import { NotAuthorizedError, NotFoundError, BadRequestError, requireAuth, validateRequest } from "@mazentickets/common";
import express, { Request, Response } from 'express'
import { body } from "express-validator";
import { Order, OrderStatus } from "../models/order";
import { stripe } from '../stripe';
import { Payment } from "../models/payment";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post('/api/payments', requireAuth,
  [
    body('token').not().isEmpty(),
    body('orderId').not().isEmpty()
  ],
  validateRequest, async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) 
      throw new NotFoundError();
    if (order.userId !== req.currentUser!.id)
      throw new NotAuthorizedError();
    if (order.status === OrderStatus.Cancelled)
      throw new BadRequestError('Cannot pay for a cancelled order');
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.price * 100, // Stripe works in cents (e.g., $10 → 1000)
      currency: 'usd',
      payment_method_types: ["card"], // Accept card payments
  });
    const payment = await Payment.build({stripeId: paymentIntent.id, orderId}).save();
    new PaymentCreatedPublisher(natsWrapper.client).publish({ orderId, id: payment.id, stripeId: payment.stripeId });
    res.json({ clientSecret: paymentIntent.client_secret, id: payment.id });

});

export { router as createChargeRouter };

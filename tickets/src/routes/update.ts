import express, { Request, Response } from 'express'
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { NotFoundError, requireAuth , validateRequest, NotAuthorizedError, BadRequestError } from '@mazentickets/common';
import { natsWrapper } from '../nats-wrapper';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
], validateRequest, async (req: Request, res: Response) => {
  const ticketId = req.params.id;
  if (!ticketId) {
    throw new NotFoundError();
  }
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new NotFoundError();
  }
  if (ticket.orderId) {
    throw new BadRequestError('Cannot edit a reserved ticket');
  }
  console.log(ticket);
  console.log(req.currentUser!.id);
  if (ticket.userId != req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  ticket.set({
    title: req.body.title,
    price: req.body.price
  })
  await ticket.save();
  
  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
    version: ticket.version
  })
  res.status(200).json(ticket);
})

export { router as updateTicketRouter }
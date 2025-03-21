import express, { Request, Response } from 'express'
import { requireAuth } from '@mazentickets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@mazentickets/common';

const router = express.Router();

router.get('/api/tickets/:id', requireAuth, async (req: Request, res: Response) => {
  const id = req.params.id;
  const ticket = await Ticket.findById(id);
  if (!ticket)
    throw new NotFoundError();
  res.status(200).json(ticket);
})

export { router as showTicketRouter }
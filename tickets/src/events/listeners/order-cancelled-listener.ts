import { Listener, Subjects, OrderCancelledEvent, OrderStatus } from '@mazentickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = 'tickets-service';
  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    console.log('Event data!', data);
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket)
      throw new Error('Ticket not found');

    ticket.set({ orderId: undefined });
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version
    });

    msg.ack();
  }
}
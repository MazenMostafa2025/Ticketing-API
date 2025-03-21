import { Listener, Subjects, PaymentCreatedEvent, OrderStatus } from "@mazentickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from '../../models/order';
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    console.log('Expiration Complete Event Received', data);
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new Error('order not found');
    }
    order.set({
      status: OrderStatus.Complete
    })
    await order.save();
    msg.ack();
  }
}
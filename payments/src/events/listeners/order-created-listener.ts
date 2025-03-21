import { Listener, OrderCreatedEvent, Subjects } from "@mazentickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: OrderCreatedEvent["subject"] = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    const order = Order.build({
      id: data.id,   
      version: data.version,
      price: data.ticket.price,
      userId: data.userId,
      status: data.status,
    });
    await order.save();
    msg.ack();
  }
}
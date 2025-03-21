import { Listener, OrderCancelledEvent, Subjects } from "@mazentickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order, OrderStatus } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: OrderCancelledEvent["subject"] = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    console.log("Event data!", data);
    const order = await Order.findByEvent({
      id: data.id,
      version: data.version
    });
    if (!order) {
      throw new Error("Order not found");
    }
    order.set({
      status: OrderStatus.Cancelled
    })
    await order.save();
    msg.ack();
  }
}
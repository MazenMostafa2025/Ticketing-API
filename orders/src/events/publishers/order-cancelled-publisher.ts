import { Publisher, Subjects, OrderCancelledEvent } from '@mazentickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled= Subjects.OrderCancelled;
}
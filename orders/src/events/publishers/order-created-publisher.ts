import { Publisher, Subjects, OrderCreatedEvent } from '@mazentickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated= Subjects.OrderCreated;
}
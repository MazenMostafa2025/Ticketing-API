import { Publisher, Subjects, TicketCreatedEvent } from '@mazentickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
import { Subjects, Publisher, PaymentCreatedEvent } from '@mazentickets/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: PaymentCreatedEvent['subject'] = Subjects.PaymentCreated
}
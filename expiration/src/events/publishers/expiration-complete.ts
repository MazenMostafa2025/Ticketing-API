import { ExpirationCompleteEvent, Publisher, Subjects } from "@mazentickets/common";

export class ExpirationCompeletedPublisher extends Publisher<ExpirationCompleteEvent> {
  subject: ExpirationCompleteEvent["subject"] = Subjects.ExpirationComplete;
}
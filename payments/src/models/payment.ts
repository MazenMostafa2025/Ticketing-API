import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
  version: number;
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
  findByEvent(event: {id: string, version: number}): Promise<PaymentDoc | null>;
}

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
  stripeId: {
    type: Number,
    required: true
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
})

PaymentSchema.set('versionKey', 'version');
PaymentSchema.plugin(updateIfCurrentPlugin);
PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
  // console.log('building');
  return new Payment(attrs);
}

PaymentSchema.statics.findByEvent = (event: { id: string, version: number}) => {
  return Payment.findOne({_id: event.id, version: event.version - 1});
}

const Payment = mongoose.model<PaymentDoc, PaymentModel>('Payment', PaymentSchema);
export { Payment };

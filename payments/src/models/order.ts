import mongoose from 'mongoose'
import { OrderStatus } from '@mazentickets/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
export { OrderStatus };

interface OrderAttrs {
  id: string;
  version: number;
  price: number;
  userId: string;
  status: OrderStatus;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  version: number;
  status: OrderStatus;
  price: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
  findByEvent(event: {id: string, version: number}): Promise<OrderDoc | null>;
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
}
)

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);
orderSchema.statics.build = (attrs: OrderAttrs) => {
  // console.log('building');
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status});
}

orderSchema.statics.findByEvent = (event: { id: string, version: number}) => {
  return Order.findOne({_id: event.id, version: event.version - 1});
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);
export { Order };

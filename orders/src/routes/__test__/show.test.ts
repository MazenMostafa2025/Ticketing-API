import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';


const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20
  })
 return await ticket.save();
}

it('fetch orders for a certain user', async () => {
  const ticket = await buildTicket();
  const user = global.signin();
  const {body: order} = await request(app).set('Cookie', user).post('/api/orders')
  .send({
    ticketId: ticket.id
  }).expect(201);
  const { body: fetchedOrder } = await request(app).set('Cookie', user).get(`/api/orders/${order.id}`).send().expect(200); 
  expect(fetchedOrder.id).toEqual(order.id);
})

it('return error if a user tries to fetch another user order', async () => {
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const user1 = global.signin();
  const user2 = global.signin();
  const {body: order1} = await request(app).set('Cookie', user1).post('/api/orders')
  .send({
    ticketId: ticket1.id
  }).expect(201);
  await request(app).set('Cookie', user2).get(`/api/orders/${order1.id}`).send().expect(401); 
})
  

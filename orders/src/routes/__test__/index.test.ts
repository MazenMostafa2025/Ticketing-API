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
  
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const user1 = global.signin();
  const user2 = global.signin();

  await request(app).set('Cookie', user1).post('/api/orders').send({ ticketId: ticket1.id }).expect(201); 
  const { body: order1 } = await request(app).set('Cookie', user2).post('/api/orders').send({ ticketId: ticket2.id }).expect(201); 
  const { body: order2 } = await request(app).set('Cookie', user2).post('/api/orders').send({ ticketId: ticket3.id }).expect(201); 
  
  const response = await request(app).set('Cookie', user2).get('/api/orders').send().expect(200); 

  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(order1.id);
  expect(response.body[1].id).toEqual(order2.id);
  expect(response.body[0].ticket.id).toEqual(ticket2.id);
  expect(response.body[1].ticket.id).toEqual(ticket3.id);
})
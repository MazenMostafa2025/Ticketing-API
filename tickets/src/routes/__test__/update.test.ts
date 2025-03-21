import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';  
  
const createTicket = () => {
  return request(app).post('/api/tickets').set('Cookie', global.signin()).send({
  title: 'title',
  price: 20
  });
}

it('return 404 if provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).put(`/api/tickets/${id}`).set('Cookie', global.signin())
  .send({title: 'title', price: 30}).expect(404);
})

it('return 401 if user not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).put(`/api/tickets/${id}`)
  .send({title: 'title11', price: 30}).expect(401);
})

it('return 401 if user does not own the ticket', async () => {
  const ticket = await createTicket();
  await request(app).put(`/api/tickets/${ticket.body.id}`).set('Cookie', global.signin())
  .send({title: 'title11', price: 30}).expect(401);
})

it('return 400 if user provide invalid title or price', async () => {
  const cookie = global.signin();
  const response = await request(app).post('/api/tickets').set('Cookie',cookie).send({title: "title", price:20}).expect(201);
  await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send({title: "", price:20}).expect(400);
  await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send({title: "new title", price:-5}).expect(400);
})

it('updates tickets providing valid inputs', async () => {
  const cookie = global.signin();
  const response = await request(app).post('/api/tickets').set('Cookie',cookie).send({title: "title", price:20}).expect(201);
  console.log(response.body.id);
  await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send({title: "new title", price:3000}).expect(200);
  const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).set('Cookie',cookie).send().expect(200);   
  expect(ticketResponse.body.title).toEqual('new title');
  expect(ticketResponse.body.price).toEqual(3000);  
})

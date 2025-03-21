import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose'

it('return 404 if ticket not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(404);
})

// it('return ticket if found', async () => {
    
//   const title = 'ant';
//   const price = 20;
//   const response = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({
//       title,
//       price
//     }).expect(201);
//     console.log(response.body);
//     const ticket = await request(app)
//     .get(`/api/tickets/${response.body.id}`)
//     .set('Cookie', global.signin())
//     .send()
//     .expect(200);

//     expect(ticket.body.title).toEqual(title);
//     expect(ticket.body.price).toEqual(price);
// })

import request from 'supertest';
import { app } from '../../app';


const createTicket = () => {
  return request(app).post('/api/tickets').set('Cookie', global.signin()).send({
    title: 'title',
    price: 20
  });
}

it('can fetch all tickets', async () => {
  
  await createTicket();
  await createTicket();
  await createTicket();
  
  await request(app).get('/api/tickets').set('Cookie', global.signin()).send().expect(200);
})
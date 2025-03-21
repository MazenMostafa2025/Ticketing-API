import request from 'supertest';
import {app} from '../../app';

it('returns a 200 on successful signin', async () => {  

  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(200);
})

it('respond with cookie when given valid credentials', async () => {  

  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);

  const response = await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
})

it('returns a 400 on wrong email', async () => {  

  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'tests@test.com',
    password: 'password'
  })
  .expect(400);
})

it('returns a 400 on wrong password', async () => {  

  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: 'passworddddddd'
  })
  .expect(400);
})

it('logging in with account that does not exist', async () => {  

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(400);

})


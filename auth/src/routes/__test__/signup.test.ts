import request from 'supertest';
import {app} from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);
})

it('returns a 400 with invalid email message', async () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'testfdijsfi',
    password: 'password'
  })
  .expect(400);
})

it('returns a 400 with invalid password message', async () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'asjdiaosdjoi@test.com',
    password: 'psw'
  })
  .expect(400);
})

it('returns a 400 with missing email and password', async () => {
  await request(app)
  .post('/api/users/signup')
  .send({email: 'aasdio@hotmail.com'})
  .expect(400);
  await request(app)
  .post('/api/users/signup')
  .send({password: "validPassword"})
  .expect(400);
})

it('returns a 400 on duplicate email', async () => {
  
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(400);
})

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();

})
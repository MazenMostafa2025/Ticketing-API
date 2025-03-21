import request from 'supertest'
import {app} from '../../app'

it('getting current user data', async () => {
  
  const cookie = await signin();
  if (!cookie) {
    throw new Error("Cookie not set after signup");
  }

  const currentUserResponse = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
 
  expect(currentUserResponse.body.currentUser.email).toEqual("test@test.com");
})


it('responds with null if not authenticated', async () => {
  const res = await request(app).get('/api/users/currentuser').send().expect(200);
  expect(res.body.currentUser).toBeNull();
})
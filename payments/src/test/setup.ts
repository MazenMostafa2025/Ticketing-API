import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import  jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
})

beforeEach(async () => {
  jest.clearAllMocks();
  if (mongoose.connection.db) {
    const collections =  await mongoose.connection.db.collections();
    for (let collection of collections) {
      collection.deleteMany({});
    }
    await mongoose.connection.db.dropDatabase();
  }
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
})

global.signin = (id?: string) => {

  const email = 'test@test.com';
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email,
  }
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = {jwt: token};

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
  
}
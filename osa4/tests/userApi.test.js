const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

jest.setTimeout(15000);

const initialUsers = [
  {
    username: 'UserNumberOne',
    name: 'User One',
    password: 'mypassword',
  },
  {
    username: 'UserNumberTwo',
    name: 'User Two',
    password: 'mypassword2',
  },
];

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = initialUsers.map(user => new User(user));
  const promiseArr = userObjects.map(userObj => userObj.save());

  await Promise.all(promiseArr);
});

describe('creating an user', () => {
  test('fails with too short username', async () => {
    const userObj = {
      username: '12',
      name: 'TooShortUsername',
      password: 'validpassword',
    };

    await api
      .post('/api/users')
      .send(userObj)
      .expect(400);

    const response = await api.get('/api/users');
    expect(response.body.length).toBe(initialUsers.length);
  });

  test('fails without password', async () => {
    const userObj = {
      username: 'validusername',
      name: 'MissingPassword',
    };

    await api
      .post('/api/users')
      .send(userObj)
      .expect(400);

    const response = await api.get('/api/users');
    expect(response.body.length).toBe(initialUsers.length);
  });
});

afterAll(() => mongoose.connection.close());

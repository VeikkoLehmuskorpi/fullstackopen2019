const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);

jest.setTimeout(20000);

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(2);
  });

  test('identifying property is named id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
    expect(response.body[1].id).toBeDefined();
  });
});

describe('when saving new blogs', () => {
  test('blog count increases', async () => {
    const initialResponse = await api.get('/api/blogs');
    const initialCount = initialResponse.body.length;

    const blogObj = {
      title: 'What happens when posting incorrect data',
      author: 'NotVeikko Lehmuskorpi',
      url: 'www.github.com/veikkolehmuskorpi',
    };

    await api.post('/api/blogs').send(blogObj);

    const endResult = await api.get('/api/blogs');

    expect(endResult.body.length).toBe(initialCount + 1);
  });

  test('if likes not set, set it to zero', async () => {
    const blogObj = {
      title: 'What happens when posting incorrect data',
      author: 'NotVeikko Lehmuskorpi',
      url: 'www.github.com/veikkolehmuskorpi',
    };

    const response = await api.post('/api/blogs').send(blogObj);

    expect(response.body.likes).toBe(0);
  });

  test('if title and url not set, return statuscode 400', async () => {
    const invalidBlogObj = {
      author: 'John Doe',
    };

    await api
      .post('/api/blogs')
      .send(invalidBlogObj)
      .expect(400);
  });
});

afterAll(() => mongoose.connection.close());

const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

jest.setTimeout(20000);

const initialBlogs = [
  {
    title: 'Initial notes are cool',
    author: 'Veikko Lehmuskorpi',
    url: 'www.github.com/veikkolehmuskorpi',
    likes: 20,
  },
  {
    title: 'So many blogs',
    author: 'Sam Smith',
    url: 'www.github.com/samsmith',
    likes: 33,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map(blog => new Blog(blog));

  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(initialBlogs.length);
  });

  test('identifying property is named id', async () => {
    const response = await api.get('/api/blogs');

    response.body.map(blogObj => expect(blogObj.id).toBeDefined());
  });
});

describe('when saving new blogs', () => {
  test('blog count increases', async () => {
    const blogObj = {
      title: 'What happens when posting incorrect data',
      author: 'NotVeikko Lehmuskorpi',
      url: 'www.github.com/veikkolehmuskorpi',
    };

    await api.post('/api/blogs').send(blogObj);

    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(initialBlogs.length + 1);
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

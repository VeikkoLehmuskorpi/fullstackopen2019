const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    author: 'John Doe',
    title: 'HTML is easy',
    url: 'www.github.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    },
  },
  {
    id: '5a451e21e0b8b04a45638211',
    author: 'John Doe',
    title: 'Browser can execute only javascript',
    url: 'www.github.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    },
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    author: 'John Doe',
    title: 'The most important methods of HTTP are GET and POST',
    url: 'www.github.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    },
  },
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll };

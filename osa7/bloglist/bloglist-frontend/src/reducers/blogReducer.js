import blogService from '../services/blogService';

const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      console.log(action.data);
      return [...state, action.data];
    case 'UPDATE_BLOG':
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      );
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data);
    case 'INIT_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export default blogReducer;

export const createBlog = (blog, user, token) => {
  console.log('1. blog', blog);
  if (!blog.title && !blog.author && !blog.url) {
    throw new Error('Missing blog details');
  }
  return async dispatch => {
    const newBlog = await blogService.createNew(blog, token);
    newBlog.user = {
      username: user.username,
      name: user.name,
      id: user.id,
    };
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    });
  };
};

export const updateBlog = (blog, updatedFields, token) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog, updatedFields, token);
    updatedBlog.user = {
      username: blog.user.username,
      name: blog.user.name,
      id: blog.user.id,
    };
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    });
  };
};

export const removeBlog = (blog, token) => {
  return async dispatch => {
    await blogService.remove(blog, token);
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog.id,
    });
  };
};

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const commentOnBlog = (blog, comment, token) => {
  console.log('blog', blog);
  console.log('blogId', blog.id);
  return async dispatch => {
    const updatedBlog = await blogService.comment(blog.id, comment, token);
    updatedBlog.user = {
      username: blog.user.username,
      name: blog.user.name,
      id: blog.user.id,
    };
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    });
  };
};

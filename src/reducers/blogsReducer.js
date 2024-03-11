import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    appendBlog: (state, action) => {
      return [...state, action.payload];
    },
    deleteBlog: (state, action) => {
      const blogs = state.filter((blog) => blog.id !== action.payload.id);
      return blogs;
    },
    updateLikes: (state, action) => {
      const updatedBlog = action.payload;
      return state.map((blog) => blog.id === updatedBlog.id
        ? updatedBlog
        : blog);
    },
    addCommentToBlog: (state, action) => {
      const id = action.payload.blogId;
      const comment = action.payload.comment;

      const existingBlog = state.find((blog) => blog.id === id);
      const updatedBlog = {
        ...existingBlog,
        comments: existingBlog.comments.concat(comment),
      };

      return state.map((blog) => blog.id === id ? updatedBlog : blog);
    },
  },
});

export const {
  setBlogs,
  appendBlog,
  deleteBlog,
  updateLikes,
  addCommentToBlog,
} = blogSlice.actions;

export const fetchAllBlogs = () => {
  return async (dispatch, getState) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (err) {
      // TODO handle error?
    }
  };
};

export const fetchBlogById = (id) => {
  return async (dispatch, getState) => {
    try {
      const blog = await blogService.getBlogById(id);
      dispatch(appendBlog(blog));
    } catch (err) {}
  };
};

export const getAllBlogs = (state) => {
  return state.blogs;
};

export const getBlog = (id) => (state) => {
  return state.blogs.find((blog) => blog.id === id);
};

export const createBlog = (newBlog) => {
  return async (dispatch, getState) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      dispatch(appendBlog(createdBlog));
    } catch (err) {
      // TODO: error handling
      console.log(err);
      //dispatch(requestFailed???)
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch, getState) => {
    try {
      await blogService.remove(blog);
      dispatch(deleteBlog(blog));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateBlogLikes = (blog) => {
  return async (dispatch, getState) => {
    try {
      const updatedBlog = await blogService.update(blog);
      dispatch(updateLikes(updatedBlog));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createComment = ({ blogId, comment }) => {
  return async (dispatch, getState) => {
    const newComment = await blogService.addComment(blogId, comment);
    console.log('new comment', newComment);
    dispatch(addCommentToBlog({ blogId, comment: newComment }));
  };
};

export default blogSlice.reducer;

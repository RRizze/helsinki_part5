import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeBlog,
  updateBlogLikes,
  fetchBlogById,
  getBlog,
} from '../reducers/blogsReducer';
import { useParams } from 'react-router-dom';
import Button from '../ui/Button';
import StyledLink from '../ui/StyledLink';
import List from '../ui/List';
import FlexContainer from '../ui/FlexContainer';
import CommentForm from './CommentForm';

const Blog = ({ user }) => {
  const dispatch = useDispatch();
  const blogId = useParams().id;
  const blog = useSelector(getBlog(blogId));

  useEffect(() => {
    if (!blog) {
      dispatch(fetchBlogById(blogId));
    }
  }, []);

  const handleRemove = (blog) => {
    if (window.confirm('Do you really want to delete the blog?')) {
      dispatch(removeBlog(blog));
    }
  };

  const handleUpdateLikes = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    dispatch(updateBlogLikes(updatedBlog));
  };

  if (!blog) {
    return <div>There's no blog with this id.</div>;
  }
  return (
    <section className='blog'>
      <FlexContainer
        $flexDirection='column'
        $alignItems='flex-start'
      >
        <h2 className='blog-title'>{blog.title}</h2>
        <h3 className='blog-author'>Author: {blog.author}</h3>
        <span>Url:
          <StyledLink className='blog-url' to='#'>
            {blog.url}
          </StyledLink>
        </span>
        <FlexContainer $alignItems='baseline'>
          <span>Likes: {blog.likes}</span>
          <Button id='add-like' onClick={() => handleUpdateLikes(blog)}>
            like
          </Button>
        </FlexContainer>

        {user.id === blog.user.id ? (
          <Button id='blog-remove' onClick={() => handleRemove(blog)}>
            remove blog:(
          </Button>
        ) : null}

        <h3>Comments</h3>
        <List>
          {blog.comments.map((comment) =>
            <li key={comment.id}>{comment.message}</li>
          )}
        </List>
        <CommentForm blogId={blogId} />
      </FlexContainer>

    </section>
  );
};

export default Blog;

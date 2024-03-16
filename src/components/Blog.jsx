import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import Button from '../ui/Button';
import StyledLink from '../ui/StyledLink';
import List from '../ui/List';
import FlexContainer from '../ui/FlexContainer';
import CommentForm from './CommentForm';
import blogService from '../services/blogs';
import { useBlogData } from '../hooks/blogs';
import { useNotificationDispatch } from '../context/notificationContext';

const Blog = () => {
  const blogId = useParams().id;
  const client = useQueryClient();
  const user = client.getQueryData(['authUser']);

  const dispatchNotification = useNotificationDispatch();
  const {
    data: blog,
    isPending,
    isLoading,
    isError,
    error,
  } = useBlogData(blogId);

  const removeMutation = useMutation({
    mutationKey: ['blogs', user],
    mutationFn: async () => await blogService.remove(blog),
    onSuccess: () => {
      client.setQueryData(['blogs'], (oldBlogs) => {
        return oldBlogs.filter((blog) => blog.id !== blogId);
      });
      client.invalidateQueries({
        queryKey: ['blogs', user],
        refetchType: 'none',
      });

      dispatchNotification({
        type: 'ADD',
        payload: {
          message: 'Blog was deleted!',
          error: false,
        },
      });
      setTimeout(() => {
        dispatchNotification({ type: 'REMOVE' });
      }, 2500);
    },
  });

  const likeMutation = useMutation({
    mutationKey: ['blogs', blogId],
    mutationFn: async (updatedBlog) => await blogService.update(updatedBlog),
    onSuccess: () => {
      client.invalidateQueries(['blogs', blogId]);

      dispatchNotification({
        type: 'ADD',
        payload: {
          message: 'You liked the blog!',
          error: false,
        },
      });
      setTimeout(() => {
        dispatchNotification({ type: 'REMOVE' });
      }, 2500);
    },
  });

  const handleRemove = () => {
    if (window.confirm('Do you really want to delete the blog?')) {
      removeMutation.mutate();
    }
  };

  const handleUpdateLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    likeMutation.mutate(updatedBlog);
  };

  if (removeMutation.isSuccess) {
    return <Navigate to='/blogs' />;
  }

  if (isPending || isLoading) {
    return <div>Data for blog is loading...</div>;
  }

  if (isError || error) {
    return <div>Can't load blog...</div>;
  }

  if (!blog) {
    return <div>No blog for this id</div>;
  }

  return (
    <section className='blog'>
      <FlexContainer $flexDirection='column' $alignItems='flex-start'>
        <h2 className='blog-title'>{blog.title}</h2>
        <h3 className='blog-author'>Author: {blog.author}</h3>
        <span>
          Url:
          <StyledLink className='blog-url' to='#'>
            {blog.url}
          </StyledLink>
        </span>
        <FlexContainer $alignItems='baseline'>
          <span>Likes: {blog.likes}</span>
          <Button id='add-like' onClick={() => handleUpdateLikes()}>
            like
          </Button>
        </FlexContainer>

        {user && user.id === blog.user.id ? (
          <Button id='blog-remove' onClick={() => handleRemove()}>
            remove blog:(
          </Button>
        ) : null}

        <h3>Comments</h3>
        <List>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.message}</li>
          ))}
        </List>
        <CommentForm blogId={blogId} />
      </FlexContainer>
    </section>
  );
};

export default Blog;

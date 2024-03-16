import { useField } from '../hooks';
import Form from '../ui/Form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogsService from '../services/blogs';
import { useNotificationDispatch } from '../context/notificationContext';

const BlogForm = () => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();

  const { mutate: blogCreate } = useMutation({
    mutationKey: ['blogs'],
    mutationFn: blogsService.create,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) => {
        return [...(oldBlogs || []), newBlog];
      });
      dispatchNotification({
        type: 'ADD',
        payload: {
          message: 'New blog was added!',
          error: false,
        },
      });
      setTimeout(() => {
        dispatchNotification({ type: 'REMOVE' });
      }, 2500);
    },
    onError: (err) => {
      dispatchNotification({
        type: 'ADD',
        payload: {
          message: err.response.data.error,
          error: true,
        },
      });
      setTimeout(() => {
        dispatchNotification({ type: 'REMOVE' });
      }, 2500);
    },
    refetchOnWindowFocus: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    blogCreate({
      title: title.value,
      author: author.value,
      url: url.value,
    });

    //dispatch(
    //  addNotification({
    //    message: `a new blog ${title.value} by ${author.value} added`,
    //    timeout: 3500,
    //  })
    //);

    title.clear();
    author.clear();
    url.clear();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='blog-title-input'>title:</label>
        <Input
          id='blog-title-input'
          name='blog-title'
          type={title.type}
          value={title.value}
          onChange={title.onChange}
          placeholder='Blog title...'
        />
      </div>

      <div>
        <label htmlFor='blog-author-input'>author:</label>
        <Input
          id='blog-author-input'
          name='blog-author'
          type={author.type}
          value={author.value}
          onChange={author.onChange}
          placeholder='Blog Author...'
        />
      </div>

      <div>
        <label htmlFor='blog-url-input'>url:</label>
        <Input
          id='blog-url-input'
          name='blog-url'
          type={url.type}
          value={url.value}
          onChange={url.onChange}
          placeholder='Blog url'
        />
      </div>
      <Button id='add-blog' type='submit'>
        add blog
      </Button>
    </Form>
  );
};

export default BlogForm;

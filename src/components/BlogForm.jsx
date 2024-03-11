import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogsReducer';
import { addNotification } from '../reducers/notificationReducer';
import Form from '../ui/Form';
import Input from '../ui/Input';
import Button from '../ui/Button';

const BlogForm = ({}) => {
  const dispatch = useDispatch();

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    );

    dispatch(
      addNotification({
        message: `a new blog ${title.value} by ${author.value} added`,
        timeout: 3500,
      })
    );

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

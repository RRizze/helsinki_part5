import { useField } from '../hooks';
import Form from '../ui/Form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { useNotificationDispatch } from '../context/notificationContext';

const CommentForm = ({ blogId }) => {
  const comment = useField('text');
  const client = useQueryClient();
  const dispatchNotification = useNotificationDispatch();

  const { mutate } = useMutation({
    mutationKey: ['blogs', blogId, 'comments'],
    mutationFn: async ({ comment, blogId }) => {
      console.log('comment', comment);
      return await blogService.addComment(blogId, comment);
    },
    onSuccess: () => {
      client.invalidateQueries(['blogs', blogId, 'comments']);

      dispatchNotification({
        type: 'ADD',
        payload: {
          message: 'You added a comment!',
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
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({ comment: comment.value, blogId });

    comment.clear();
  };

  return (
    <Form onSubmit={handleSubmit} $border='1px solid var(--primary-color1)'>
      <div>
        <label htmlFor='comment-message-input'>comment:</label>
        <Input
          id='comment-message-input'
          name='comment-message'
          type={comment.type}
          value={comment.value}
          onChange={comment.onChange}
          placeholder='...'
        />
      </div>

      <Button id='add-comment' type='submit'>
        add comment
      </Button>
    </Form>
  );
};

export default CommentForm;

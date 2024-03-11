
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createComment } from '../reducers/blogsReducer';
import { addNotification } from '../reducers/notificationReducer';
import Form from '../ui/Form';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch();

  const comment = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createComment({
        blogId,
        comment: comment.value,
      })
    );

    dispatch(
      addNotification({
        message: `a new comment was added`,
        timeout: 2500,
      })
    );

    comment.clear();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      $border='1px solid var(--primary-color1)'
    >
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

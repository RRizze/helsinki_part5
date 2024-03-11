import { getNotification } from '../reducers/notificationReducer';
import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, error } = useSelector(getNotification);
  const className = error ? 'error' : 'success';

  if (!message) {
    return null;
  }
  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;

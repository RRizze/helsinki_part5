import { useNotificationValue } from '../context/notificationContext';

const Notification = () => {
  const { message, error } = useNotificationValue();
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

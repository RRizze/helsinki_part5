const Notification = ({ message, className }) => {
  if (!message) {
    return null;
  }
  return (
    <div className={`notification ${className}`} >
      <p>{message}</p>
    </div>
  );
};

export default Notification;

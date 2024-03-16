import { createContext, useContext, useReducer } from 'react';

const initialState = {
  message: '',
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      return action.payload;
    }

    case 'REMOVE': {
      return initialState;
    }

    default:
      return state;
  }
};

const NotificationContext = createContext(initialState);

export const useNotificationValue = () => {
  const notificationValueAndDispatch = useContext(NotificationContext);
  return notificationValueAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationValueAndDispatch = useContext(NotificationContext);
  return notificationValueAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(reducer, initialState);

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

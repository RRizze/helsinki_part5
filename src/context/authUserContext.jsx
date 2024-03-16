import { useReducer, useContext, createContext } from 'react';

const loggedUser = window.localStorage.getItem('loggedUser');

const initialState = loggedUser ? JSON.parse(loggedUser) : null;

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const loggedUser = action.payload;
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      return action.payload;
    }
    case 'LOGOUT': {
      window.localStorage.removeItem('loggedUser');
      return null;
    }
    default:
      return state;
  }
};

const AuthUserContext = createContext(initialState);

export const useAuthUserValue = () => {
  const authUserValueAndDispatch = useContext(AuthUserContext);
  return authUserValueAndDispatch[0];
};

export const useAuthUserDispatch = () => {
  const authUserValueAndDispatch = useContext(AuthUserContext);
  return authUserValueAndDispatch[1];
};

export const AuthUserContextProvider = (props) => {
  const [user, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthUserContext.Provider value={[user, dispatch]}>
      {props.children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContext;

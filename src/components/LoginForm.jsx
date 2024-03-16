import { useField } from '../hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '../ui/Input';
import Form from '../ui/Form';
import Button from '../ui/Button';
import FlexContainer from '../ui/FlexContainer';
import { Navigate } from 'react-router-dom';
import loginService from '../services/login';
import { useNotificationDispatch } from '../context/notificationContext';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');
  const dispatchNotification = useNotificationDispatch();

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationKey: ['authUser'],
    mutationFn: async (loginData) => {
      const loggedUser = await loginService.login(loginData);
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      return loggedUser;
    },
    onSuccess: (authUser) => {
      console.log('onsucces', authUser);
      queryClient.setQueryData(['authUser'], authUser);
      dispatchNotification({
        type: 'ADD',
        payload: {
          message: 'You are logged in!',
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
      console.log('error', err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginMutation.mutate({
      username: username.value,
      password: password.value,
    });

    username.clear();
    password.clear();
  };

  if (queryClient.getQueryData(['authUser'])) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <h1>Useless Blogs app.</h1>
      <Form $margin='0 auto' onSubmit={handleSubmit}>
        <FlexContainer $flexDirection='column'>
          <Input
            name='username'
            id='input-username'
            type={username.type}
            value={username.value}
            onChange={username.onChange}
            placeholder='Enter your name'
          />

          <Input
            id='input-password'
            name='password'
            type={password.type}
            value={password.value}
            onChange={password.onChange}
            placeholder='Enter your password'
          />
          <Button id='login-button' type='submit'>
            Login
          </Button>
        </FlexContainer>
      </Form>
    </>
  );
};

export default LoginForm;

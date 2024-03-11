import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authReducer';
import Input from '../ui/Input';
import Form from '../ui/Form';
import Button from '../ui/Button';
import FlexContainer from '../ui/FlexContainer';
import { Navigate } from 'react-router-dom';

const LoginForm = ({ user }) => {
  const username = useField('text');
  const password = useField('password');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      login({
        username: username.value,
        password: password.value,
      })
    );

    username.clear();
    password.clear();
  };

  if (user) {
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

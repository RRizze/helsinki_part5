const LoginForm = ({
  username,
  password,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handleSubmit} >
      <div>
        username
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div>
        password
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
  );
};

export default LoginForm;

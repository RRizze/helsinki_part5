import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [errorMessage, setErrorMessage] = useState({
    message: null,
    error: false,
  });

  const blogFormRef = useRef();

  const sortBlogs = (b1, b2) => {
    return b2.likes - b1.likes;
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort(sortBlogs));
    });
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser');

    if (loggedUser) {
      const userObj = JSON.parse(loggedUser);
      setUser(userObj);
      blogService.setToken(userObj.token);
    }
  }, []);

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage({
        message: null,
        error: false,
      });
    }, 2500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loggedUser = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      setUsername('');
      setPassword('');

      setErrorMessage({
        message: 'Login success',
        error: false,
      });

      clearErrorMessage();
    } catch (exception) {
      setErrorMessage({
        message: 'Wrong username or password',
        error: true,
      });

      clearErrorMessage();
    }
  };

  const handleAddBlog = async ({ title, author, url }) => {
    try {
      const addedBlog = await blogService.create({
        title,
        author,
        url,
      });

      setErrorMessage({
        message: `a new blog ${title} by ${author} added`,
        error: false,
      });

      setBlogs(blogs.concat(addedBlog).sort(sortBlogs));

      clearErrorMessage();

      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      setErrorMessage({
        message: 'All fields are required',
        error: true,
      });

      clearErrorMessage();
    }
  };

  const loginForm = () => {
    return (
      <>
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handleUsernameChange={(e) => setUsername(e.target.value)}
          handlePasswordChange={(e) => setPassword(e.target.value)}
        />
      </>
    );
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm addBlog={handleAddBlog} />
      </Togglable>
    );
  };

  const logOut = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('loggedBlogUser');
    blogService.setToken(null);
    setUser(null);
  };

  const handleAddLike = async ({ e, blog }) => {
    e.preventDefault();

    const updatedBlog = await blogService.update(blog);
    const blogsFiltered = blogs.filter((blog) => {
      return blog.id === updatedBlog.id ? updatedBlog : blog;
    });
    setBlogs(blogsFiltered.sort(sortBlogs));
  };

  const handleRemoveBlog = async ({ e, blog }) => {
    e.preventDefault();

    if (window.confirm('Do you really want to delete the blog?')) {
      await blogService.remove(blog);

      const filteredBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(filteredBlogs.sort(sortBlogs));
    }
  };

  return (
    <div>
      <Notification
        message={errorMessage.message}
        className={errorMessage.error ? 'error' : 'success'}
      />

      {!user && loginForm()}

      {user && (
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in</p>
          <button id='logout' onClick={logOut}>
            logout
          </button>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleAddLike={handleAddLike}
              handleRemove={handleRemoveBlog}
              userId={user.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

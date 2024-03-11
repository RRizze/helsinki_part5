import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserById, getUser } from '../reducers/usersReducer';
import { useParams } from 'react-router-dom';
import StyledLink from '../ui/StyledLink';

const User = () => {
  const id = useParams().id;
  const dispatch = useDispatch();

  const user = useSelector(getUser(id));

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserById(id));
    }
  }, []);

  if (!user) {
    return <div>No user</div>;
  }

  // TODO: add route to blog
  return (
    <div className='user'>
      <h2>{user.username}</h2>
      <h3>Blogs created:</h3>
      <ul className='user-blog-list'>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;

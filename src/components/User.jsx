import { useParams } from 'react-router-dom';
import StyledLink from '../ui/StyledLink';
import { useUserData } from '../hooks/users';

const User = () => {
  const id = useParams().id;
  const { data: user, isPending, isError } = useUserData(id);

  if (isPending) {
    return <div>Loading user...</div>;
  }

  if (isError) {
    return <div>There is no user</div>;
  }

  if (!user) {
    return <div>No user</div>;
  }

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

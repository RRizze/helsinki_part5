import { getAllBlogs, fetchAllBlogs } from '../reducers/blogsReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import StyledLink from '../ui/StyledLink';
import BlogForm from './BlogForm';

const Blogs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, []);

  const blogs = useSelector(getAllBlogs);

  if (blogs.length < 0) {
    return <div>No blogs are created</div>;
  }

  return (
    <section className='blogs-section'>
      <h2>Blogs</h2>
      <BlogForm />
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Blogs;

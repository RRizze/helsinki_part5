import StyledLink from '../ui/StyledLink';
import BlogForm from './BlogForm';
import { useBlogsData } from '../hooks/blogs';

const Blogs = () => {
  const { data: blogs, isPending, isError } = useBlogsData();

  if (isPending) {
    return <div>...loading blogs</div>;
  }

  if (isError) {
    return <div>something went wrong...</div>;
  }

  return (
    <section className='blogs-section'>
      <h2>Blogs</h2>
      <BlogForm />
      <ul>
        {blogs?.map((blog) => (
          <li key={blog.id}>
            <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Blogs;

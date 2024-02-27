import PropTypes from 'prop-types';
import { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='blog-title-input'>title:</label>
        <input
          id='blog-title-input'
          type='text'
          name='blog-title'
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div>
        <label htmlFor='blog-author-input'>author:</label>
        <input
          id='blog-author-input'
          type='text'
          name='blog-author'
          value={author}
          onChange={handleAuthorChange}
        />
      </div>

      <div>
        <label htmlFor='blog-url-input'>url:</label>
        <input
          id='blog-url-input'
          type='text'
          name='blog-url'
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button id='add-blog' type='submit'>
        add blog
      </button>
    </form>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  //blogTitle: PropTypes.string.isRequired,
  //blogAuthor: PropTypes.string.isRequired,
  //blogUrl: PropTypes.string.isRequired,
  //handleBlogTitleChange: PropTypes.func.isRequired,
  //handleBlogAuthorChange: PropTypes.func.isRequired,
  //handleBlogUrlChange: PropTypes.func.isRequired,
};

export default BlogForm;

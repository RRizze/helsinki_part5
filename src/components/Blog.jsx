import { useState } from 'react';

const Blog = ({ blog, handleAddLike, handleRemove, userId }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBotton: 5,
  };

  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const infoStyle = { display: visible ? '' : 'none' };

  return (
    <div className='blog' style={blogStyle}>
      <div>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <button
          id='blog-show'
          className='btn-toggle'
          onClick={toggleVisibility}
        >
          show
        </button>
      </div>

      <div className='blog-url-likes' style={infoStyle}>
        <a className='blog-url' href='#'>
          {blog.url}
        </a>
        <div className='blog-likes'>
          <span>likes:</span> {blog.likes}
          <button id='add-like' onClick={(e) => handleAddLike({ e, blog })}>
            like
          </button>
        </div>

        {Object.prototype.hasOwnProperty.call(blog, 'user') ? (
          <p className='blog-author'>Author: {blog.user.username}</p>
        ) : (
          ''
        )}
      </div>
      {userId === blog.user.id ? (
        <button id='blog-remove' onClick={(e) => handleRemove({ e, blog })}>
          remove
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Blog;

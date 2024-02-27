import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm/>', () => {
  test('form udates parent state and calls onSubmit', async () => {
    const user = userEvent.setup();

    const addBlog = jest.fn();

    const container = await render(
      <BlogForm
        addBlog={addBlog}
        // TODO: Why this test is not working? Cuz state is not here?
        //blogTitle={blogTitle}
        //blogAuthor={''}
        //blogUrl={''}
        //handleBlogTitleChange={handleBlogTitleChange}
        //handleBlogAuthorChange={handleBlogAuthorChange}
        //handleBlogUrlChange={handleBlogUrlChange}
      />
    ).container;

    const inputTitle = container.querySelector('#blog-title-input');
    const inputAuthor = container.querySelector('#blog-author-input');
    const inputUrl = container.querySelector('#blog-url-input');

    const sendButton = screen.getByText('add blog');

    await user.type(inputTitle, 'testing title.');
    await user.type(inputAuthor, 'B.B.');
    await user.type(inputUrl, 'google.com');

    await user.click(sendButton);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe('testing title.');
    expect(addBlog.mock.calls[0][0].author).toBe('B.B.');
    expect(addBlog.mock.calls[0][0].url).toBe('google.com');
  });
});

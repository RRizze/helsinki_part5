import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';


describe('<Blog />', () => {
  let blog;

  beforeEach(() => {
    blog = {
      title: 'Test title.',
      author: 'T.T.',
      url: 'google.com',
      likes: 0,
      user: {
        id: 'userid1',
        username: 'kok',
        name: 'kok',
      },
    };
  });

  test('test content', () => {
    render(<Blog blog={blog} userId='1' />);

    const element = screen.getByText('Test title.');
    expect(element).toBeDefined();
  });

  test(
    'clicking the button "like" twice calls event handler "handleAddLike" twice',
    async () => {
      const mockHandler = jest.fn();

      render(
        <Blog blog={blog} userId='1' handleAddLike={mockHandler} />
      );

      const user = userEvent.setup();
      const button = screen.getByText('like');
      await user.click(button);
      await user.click(button);

      expect(mockHandler.mock.calls).toHaveLength(2);
    }
  );

  test('renders title and author of a blog', () => {

    const { container } = render(<Blog blog={blog} userId='1' />);

    const title = screen.getByText('Test title.');
    const author = screen.getByText('T.T.');
    expect(title).toBeDefined();
    expect(author).toBeDefined();

    const urlLikes = container.querySelector('.blog-url-likes');
    expect(urlLikes).toHaveStyle('display: none');
  });

  test('renders url and likes of a blog when the button is clicked', async () => {
    const { container } = render(<Blog blog={blog} userId='1' />);

    const urlLikes = container.querySelector('.blog-url-likes');
    expect(urlLikes).toHaveStyle('display: none');

    const user = userEvent.setup();
    const btn = container.querySelector('.btn-toggle');
    await user.click(btn);
    expect(urlLikes).not.toHaveStyle('display: none');
  });

});


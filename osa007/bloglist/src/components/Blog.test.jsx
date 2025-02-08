import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
  title: 'Testing 1 2 3',
  author: 'Testi Testinen',
  url: 'https://www.example.com/',
  likes: '9',
  user: {
    username: 'tester',
    name: 'Test User'
  }
};

const loggedUser = {
  username: 'tester',
  name: 'Test User'
};

test('renders title and author by default', async () => {

  render(<Blog blog={blog} />);

  const element = screen.getByText('Testing 1 2 3 Testi Testinen');
  expect(element).toBeDefined();
});

test('renders url and likes when clicking view', async () => {

  const mockHandler = vi.fn();

  render(<Blog blog={blog} loggedUser={loggedUser} />);

  const titleAuthorElement = screen.getByText('Testing 1 2 3 Testi Testinen');
  expect(titleAuthorElement).toBeDefined();

  const user = userEvent.setup();
  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const urlElement = screen.getByText('https://www.example.com/');
  expect(urlElement).toBeDefined();
  const likesElement = screen.getByText('likes 9');
  expect(likesElement).toBeDefined();
});

test('Click like-button twice and it\'s event calls twice', async () => {

  const mockHandler = vi.fn();

  render(
    <Blog
      blog={blog}
      addLike={mockHandler}
      loggedUser={loggedUser}
    />
  );

  let user = userEvent.setup();
  const viewButton = screen.getByText('view');
  await user.click(viewButton);
  user = userEvent.setup();
  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});


import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlog';
import Blog from './Blog';

test('Add new blog returns given new blog', async () => {

  const user = userEvent.setup();
  const createBlog = vi.fn();

  render(<NewBlogForm createBlog={createBlog} />);

  const input = screen.getAllByRole('textbox');

  await user.type(input[0], 'Linux toimii liian hitaasti? Näin löydät syyn');
  await user.type(input[1], 'onioni.fi');
  await user.type(input[2], 'https://onioni.fi/linux/linux-toimii-liian-hitaasti-nain-loydat-syyn/');

  const createButton = screen.getByText('create');
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Linux toimii liian hitaasti? Näin löydät syyn');
  expect(createBlog.mock.calls[0][0].author).toBe('onioni.fi');
  expect(createBlog.mock.calls[0][0].url).toBe('https://onioni.fi/linux/linux-toimii-liian-hitaasti-nain-loydat-syyn/');

});

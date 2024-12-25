const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
    .populate('blogs', { url: 1, title: 1, author: 1 });

  if (user)
    response.json(user);
  else
    response.status(404).end();
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (password && password.length < 3)
    return response.status(400).json({ error: 'password is too short' });

  const saltRounds = 10;
  const passwordHash = password
    ? await bcrypt.hash(password, saltRounds)
    : undefined;

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

usersRouter.patch('/:id', async (request, response) => {
  const { oldPassword, newPassword } = request.body;

  if (newPassword && newPassword.length < 3)
    return response.status(400).json({ error: 'password is too short' });

  const user = await User.findById(request.params.id);
  if (!user)
    return response.status(404).json({ error: 'User not found' });

  if (!(await bcrypt.compare(oldPassword, user.passwordHash)))
    return response.status(404).json({ error: 'Old password is incorrect' });

  if (await bcrypt.compare(newPassword, user.passwordHash))
    return response.status(404).json({ error: 'New password must be different than old password' });

  const saltRounds = 10;
  user.passwordHash = await bcrypt.hash(newPassword, saltRounds);
  await user.save();

  response.status(200).json({ message: 'Password updated successfully' });
});

module.exports = usersRouter;

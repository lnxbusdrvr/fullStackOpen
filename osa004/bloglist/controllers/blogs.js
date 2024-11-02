const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', { username: 1, name: 1 });

  if (blog)
    response.json(blog);
  else
    response.status(404).end();
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  let user = request.user;

  if (!user)
    user = await User.findOne({});

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const userFromToken = request.user;

  if (!userFromToken)
    return response.status(401).json({ error: 'user not found' });

  const blog = await Blog.findById(request.params.id);
  if (!blog)
    return response.status(404).json({ error: 'blog not found' });

  if (blog.user.toString() !== userFromToken._id.toString())
    return response.status(403).json({ error: 'only the creator can delete this blog' });

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const userFromToken = request.user;

  if (!userFromToken)
    return response.status(401).json({ error: 'user not found' });

  const blog = await Blog.findById(request.params.id);
  if (!blog)
    return response.status(404).json({ error: 'blog not found' });

  if (blog.user.toString() !== userFromToken._id.toString())
    return response.status(403).json({ error: 'only the creator can modify this blog' });

  const blogWithUpdatedData = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogWithUpdatedData, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;

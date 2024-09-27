const _ = require('lodash');

const dummy = (blogs) => {
  void blogs;
  return 1;
};

const totalLikes = (blogs) =>
  blogs.reduce((sum, current) =>
    sum + current.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.reduce((prev, current) =>
    (current.likes > prev.likes)
      ? current : prev);

const mostBlogs = (blogs) =>
  _.chain(blogs)
    .countBy('author')
    .map((blogs, author) => ({ author, blogs }))
    .maxBy('blogs')
    .value();

const mostLikes = (blogs) =>
  _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, likes: _.sumBy(blogs, 'likes') }))
    .maxBy('likes')
    .value();


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};


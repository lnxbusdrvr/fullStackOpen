const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) =>
  blogs.reduce((sum, current) =>
    sum + current.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.reduce((prev, current) =>
    (current.likes > prev.likes)
    ? current : prev);


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog 
};


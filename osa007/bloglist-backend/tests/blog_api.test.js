const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');

const helper = require('./test_helper');

const Blog = require('../models/blog');
const User = require('../models/user');

let authToken;

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();

    const blogsWithUser = helper.initialBlogs.map(blog => ({
      ...blog,
      user: user._id
    }));

    await Blog.insertMany(blogsWithUser);

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    authToken = loginResponse.body.token;
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are six blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`);
    assert.strictEqual(response.body.length, 6);
  });

  describe('viewing a specific blog', () => {
    test('Test if id-field is named id, not _id', async () => {
      const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`);
      const blog = response.body[0];

      assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, 'id'), true);
      assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, '_id'), false);
    });
  });

  describe('addition of a new blog', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        author: 'Node Test',
        url: 'https://node.com/',
        title: 'Node',
        likes: 0
      };
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`);
      const titles = response.body.map(r => r.title);

      assert.strictEqual(titles.length, helper.initialBlogs.length + 1);
    });

    test('If likes is missing, then likes value will be zero', async () => {
      const newBlogWNoLikeValue = {
        author: 'Node Test',
        url: 'https://node.com/',
        title: 'Test With No Likes value'
      };
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newBlogWNoLikeValue)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogs = await helper.blogsInDb();
      const lastAddedBlog = blogs
        .find(blog => blog.title === 'Test With No Likes value');

      assert.strictEqual(lastAddedBlog.likes, 0);
    });

    test('No title, returns 400 Bad request', async () => {
      const newBlogWNoTitle = {
        author: 'Node Test',
        url: 'https://node.com/',
        likes: 0
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newBlogWNoTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`);
      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });

    test('No url, returns 400 Bad request', async () => {
      const newBlogWNoUrl = {
        author: 'Node Test',
        title: 'Test With No Likes value',
        likes: 0
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newBlogWNoUrl)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`);
      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });
  });

  describe('deletion of a blog', () => {
    test('a valid blog can be deleted', async () => {
      const blogs = await helper.blogsInDb();
      const blogToDelete = blogs[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);

      const responseBlogs = await helper.blogsInDb();
      const titles = responseBlogs.map(r => r.title);

      assert.strictEqual(responseBlogs.length, helper.initialBlogs.length - 1);
      assert(!titles.includes(blogToDelete.title));
    });
  });

  describe('Modifing of a blog', () => {
    test('a valid blog can be edited', async () => {
      const blogs = await helper.blogsInDb();
      const blogToEdit = blogs[0];

      const updatedBlog = {
        ...blogToEdit,
        likes: 101
      };
      await api
        .put(`/api/blogs/${blogToEdit.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const responseBlogs = await helper.blogsInDb();
      const blogsEdited = responseBlogs.find(blog => blog.id === blogToEdit.id);

      assert.strictEqual(blogsEdited.likes, 101);
      assert.notStrictEqual(blogToEdit.likes, blogsEdited.likes);
    });
  });
});

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    assert(usernames.includes(newUser.username));
  });

  describe('Checking user requirements', () => {
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert(result.body.error.includes('expected `username` to be unique'));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test('creation fails with no username', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        name: 'User',
        password: 'salainen',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert(result.body.error.includes('username is required'));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test('creation fails with username too short', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'u',
        name: 'User',
        password: 'salasana',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert(result.body.error.includes('username is too short'));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
  });

  describe('Checking password requirements', () => {
    test('creation fails with no password', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'azzip',
        name: 'User'
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert(result.body.error.includes('password is required'));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test('creation fails with password too short', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'username',
        name: 'User',
        password: 's'
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert(result.body.error.includes('password is too short'));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
  });

  describe('Checking users', () => {
    test('creation ok with user add', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'azzip',
        name: 'User'
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert(result.body.error.includes('password is required'));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test('creation fails with password too short', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'username',
        name: 'User',
        password: 's'
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();

      assert(result.body.error.includes('password is too short'));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
  });

  describe('deletion of a user', () => {
    test('a valid user can be deleted', async () => {
      const users = await helper.usersInDb();
      const userToDelete = users[0];

      await api
        .delete(`/api/users/${userToDelete.id}`)
        .expect(204);

      const responseUsers = await helper.usersInDb();
      const names = responseUsers.map(r => r.name);

      assert.strictEqual(responseUsers.length, users.length - 1);
      assert(!names.includes(userToDelete.title));
    });
  });
});

describe('Modifiying user passwords', () => {
  const currentPassword = 'nykyinenSalasana';
  const newPassword = 'uusiSalasana';

  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash(currentPassword, 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('Set succesfully new password', async () => {
    const users = await helper.usersInDb();
    const user = users[0];

    await api
      .patch(`/api/users/${user.id}`)
      .send({ oldPassword: currentPassword, newPassword: newPassword })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const updatedUser = await User.findById(user.id);
    const newPasswordMatches = await bcrypt.compare(newPassword, updatedUser.passwordHash);
    assert.strictEqual(newPasswordMatches, true);
  });


  test('Updated password fails with too short password', async () => {
    const users = await helper.usersInDb();
    const user = users[0];

    const tooShortPasswd = 's';
    const response = await api
      .patch(`/api/users/${user.id}`)
      .send({ oldPassword: currentPassword, newPassword: tooShortPasswd })
      .expect(400);

    assert.strictEqual(response.body.error, 'password is too short' );
  });

  test('Old password fails with given incorrect password', async () => {
    const users = await helper.usersInDb();
    const user = users[0];

    const incorrectOldPasswd = 'incorrectPasswd';
    const response = await api
      .patch(`/api/users/${user.id}`)
      .send({ oldPassword: incorrectOldPasswd, newPassword })
      .expect(404);

    assert.strictEqual(response.body.error, 'Old password is incorrect' );
  });

  test('fails with given new password as current password', async () => {
    const users = await helper.usersInDb();
    const user = users[0];

    const response = await api
      .patch(`/api/users/${user.id}`)
      .send({ oldPassword: currentPassword, newPassword: currentPassword })
      .expect(404);

    assert.strictEqual(response.body.error, 'New password must be different than old password' );
  });
});


after(async () => {
  await mongoose.connection.close();
});

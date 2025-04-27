// backend/test/server.test.js
const request = require('supertest');
const { app, server } = require('../server'); // Oletetaan, että server.js exporttaa app-olion

describe('Backend API -testit', () => {
  it('GET /api/data returns JSON-object with message ', async () => {
    const res = await request(app)
      .get('/api/data')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Hello from backend!');
  });

  afterAll((done) => {
    server.close(done);
  });
});

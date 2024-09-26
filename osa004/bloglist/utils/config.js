require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let ROUTE_PATH = '/api/blogs';

module.exports = {
  MONGODB_URI,
  PORT,
  ROUTE_PATH
};

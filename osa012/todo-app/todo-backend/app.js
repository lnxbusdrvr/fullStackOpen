const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger('info', `Server is running on port ${port}`);
});

module.exports = app;

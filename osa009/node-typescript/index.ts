//const express = require('express') as typeof import('express');
//const express = require('express');
import * as express from 'express';
const app = express();

app.get('/hello', (req: express.Request, res: express.Response) => {
  res.send('\'Hello Full Stack!\'');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


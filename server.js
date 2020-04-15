// * SETTINGS && PKGS
const express = require('express');
const server = express();
// const settings = [express.json()];
server.use(express.json());

// * ROUTE IMPORTS
const userRouter = require('./users/userRouter');

// * custom middleware
const logger = (req, res, next) => {
  console.log('Logger middleware: ' + {request_type: req.method, request_url: req.url, timestamp: Date.now()})
  next()
}

// * ROUTES
server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/users', userRouter);

module.exports = server;

const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');//import this middleware that protect your api in the network tab.. this
//where hacker cannot get to.
const logger = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//GLOBAL MIDDLEWARE


server.use(express.json());// this is a built in middleware because it is built into express

server.use('/api/hubs', hubsRouter);

//third party middleware
server.use(helmet())
server.use(logger('dev'))

//custom middlware
server.use(typeLogger) 
server.use(addName)
server.use(lockout)

//router
server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';  //this code was re written as a custom middlware at the buttom of the page

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

//custom middleware

function typeLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next();// this tells the computer to move on to the next
}

function addName(req, res, next) {
  req.name = req.name || 'darren'
  next();
}

function lockout(req, res, next) { 
  res.status(403).json({ message: 'API Lockout!'});
}

function moodyGateKeeper(req, res, next) {
  
}

module.exports = server;

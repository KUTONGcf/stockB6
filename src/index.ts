import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { uri } from './config/database';
import path from 'path';
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import session = require('express-session');
import passport = require('passport');
import flash from 'connect-flash';
import { configPassport } from './config/passport';
import { router } from './routes';
import * as http from "http";

mongoose.connect(uri, { useNewUrlParser: true });

const app = express();

// view
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// body/cookie parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// static resources
app.use(express.static(path.join(__dirname, '../public')));

// session
app.use(session({secret: 'shhsecret', resave: true, saveUninitialized: true}));

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// config passport
configPassport();

// cros
app.use(function(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
       res.send(200);
   } else {
       next();
   }
});


// add user authenticated middleware
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user.local);
    res.locals.user = req.user.local;
  }
  next();
});

// routers here
app.use(router);

// handle not found
app.use(function(req, res, next) {
  const err = new Error('Not found') as any;
  err.status = 404;
  next(err);
});

// handle error
app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  res.status((err as any).status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  });
});

// app.listen(5000);

const server = http.createServer(app);

server.listen(5000);
server.on('error', function (error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = 'Port 5000';

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

console.log('now listening at localhost:5000');
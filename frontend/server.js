const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler(); // next에서 가져온 get 요청 처리기

dotenv.config();

app.prepare().then(() => { // express와 next 연동
  const server = express();
  server.use(morgan('dev'));

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET)); // 백엔드와 같게
  server.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }));

  server.get('/singlepost/:id', (req, res) => {
    return app.render(req, res, '/singlepost', { id: req.params.id });
  });
  server.get('/hashtag/:tag', (req, res) => { // 실제 동작 주소
    return app.render(req, res, '/hashtag', { tag: req.params.tag }); // next 주소 express 주소와 연결
  });
  server.get('/user/:id', (req, res) => {
    return app.render(req, res, '/user', { id: req.params.id });
  });
  server.get('*', (req, res) => {
    return handle(req, res); // handle에 (req, res) 연결
  });

  server.listen(3020, () => {
    console.log('Running on Frontend server 3020');
  });
});

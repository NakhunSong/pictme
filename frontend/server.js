const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const https = require('https');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler(); // next에서 가져온 get 요청 처리기

dotenv.config();

app.prepare().then(() => { // express와 next 연동
  const server = express();

  server.use(morgan('dev'));
  server.use('/', express.static(path.join(__dirname, 'public'))); // 앞 '/': 프론트 주소, express.static: 서버 주소(/public/).
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
  server.get('/following/:id', (req, res) => {
    return app.render(req, res, '/following', { id: req.params.id });
  });
  server.get('/follower/:id', (req, res) => {
    return app.render(req, res, '/follower', { id: req.params.id });
  });
  server.get('*', (req, res) => {
    return handle(req, res); // handle에 (req, res) 연결
  });

  if (prod) {
    const glx = require('greenlock-express').create({
      version: 'draft-11', // letsencrypt version 2
      configDir: '/etc/letsencrypt',
      server: 'https://acme-v02.api.letsencrypt.org/directory',
      approveDomains: (opts, certs, cb) => {
        if (certs) {
          opts.domains = ['pictme.site', 'www.pictme.site'];
        } else {
          opts.email = 'nak4627@gmail.com';
          opts.agreeTos = true;
        }
        cb(null, { options: opts, certs });
      },
      renewWithin: 81 * 24 * 60 * 60 * 1000, // renew auto every 81
      renewBy: 80 * 24 * 60 * 60 * 1000, // renew auto every 80
    });
    https.createServer(glx.httpsOptions, glx.middleware(server)).listen(443); // port 443
    http.createServer(glx.middleware(require('redirect-https')())).listen(80); // port 80    
  } else {
    server.listen(prod ? process.env.PORT : 3020, () => {
      console.log(`Frontend Server running on port ${process.env.PORT}`);
    });
  }
});

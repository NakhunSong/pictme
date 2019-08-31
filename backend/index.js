const dotenv = require('dotenv');
const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const https = require('https');
const http = require('http');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const hashtagAPIRouter = require('./routes/hashtag');

const prod = process.env.NODE_ENV === 'production';

dotenv.config();
const {
  COOKIE_SECRET: cookieSecret
} = process.env;

const app = express();

db.sequelize.sync();
passportConfig();

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(cors({
    origin: 'https://pictme.site',
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true, // 요청 주소와 같게 설정. 모든 요청 허락.
    credentials: true, // true: 헤더 전달.
  }));
}

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false, // 세션 매번 강제 저장
  saveUninitialized: false, // 빈 값 저장 가능 여부.
  secret: cookieSecret,
  cookie: {
    httpOnly: true,
    secure: prod, // https 사용 시 true
    domain: prod && '.pictme.site',
  },
  name: 'pckfife',
}));

app.use(passport.initialize());
app.use(passport.session()); // express-session 보다 아래에 선언.

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/hashtag', hashtagAPIRouter);

app.get('/', (req, res) => {
  res.send('Backend Server is running!');
});

if (prod) {
  const lex = require('greenlock-express').create({
    version: 'draft-11', // letsencrypt version 2
    configDir: '/etc/letsencrypt',
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    approveDomains: (opts, certs, cb) => {
      if (certs) {
        opts.domains = ['api.pictme.site'];
      } else {
        opts.email = 'nak4627@gmail.com';
        opts.agreeTos = true;
      }
      cb(null, { options: opts, certs });
    },
    renewWithin: 81 * 24 * 60 * 60 * 1000, // renew auto every 81
    renewBy: 80 * 24 * 60 * 60 * 1000, // renew auto every 80
  });
  https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443); // port 443
  http.createServer(lex.middleware(require('redirect-https')())).listen(80); // port 80
} else {
  app.listen(prod ? process.env.PORT : 3030, () => {
    console.log(`Backend Server running on port ${process.env.PORT}`);
  });
}
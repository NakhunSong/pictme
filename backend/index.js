const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');

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
    origin: 'http://pictme.site',
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
    secure: false, // https 사용 시 true
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
  res.send('백엔드 서버 작동중 확인');
});

app.listen(prod ? process.env.PORT : 3030, () => {
  console.log(`백엔드 서버 작동 on port ${process.env.PORT}`);
});
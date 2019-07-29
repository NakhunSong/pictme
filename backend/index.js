const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

// const passportConfig = require('./passport');
// const db = require('./models');
// const userAPIRouter = require('./routes/user');
// const postAPIRouter = require('./routes/post');
// const postsAPIRouter = require('./routes/posts');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('백엔드 서버 작동중');
})
app.listen(3065, () => {
  console.log('서버 작동 완료')
})
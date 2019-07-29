const passport = require('passport');
const db = require('../models');
const local = require('./local'); // 만든 local 전략

module.exports = () => {
  // 로그인할때 serializeUser
  // 서버쪽 메모리에 [{ id: 3(회원), cookie: 'asdfsdf' }] 식으로 생성하여 보관.
  // cookie는 프론트로 전송.
  passport.serializeUser((user, done) => {
    return done(null, user.id); // return 생략 가능.
  });

  // 프론트에서 서버로 보낸 쿠키를 통해 로그인 정보 인증하는데 사용.
  // 'cookie'값과 매칭된 'id'를 통해 db에 저장된 사용자의 상세정보 식별.
  passport.deserializeUser( async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
        include: [{
          model: db.Post,
          as: 'Posts',
          attributes: ['id'],
        }, {
          model: db.User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: db.User,
          as: 'Followers',
          attributes: ['id'],
        }],
      });
      return done(null, user); // req.user에 저장됨.
    } catch (e) {
      console.log(e);
      return done(e);
    }
  });

  local(); // local 전략을 index.js 에 연결
}
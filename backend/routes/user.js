const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => { // GET /api/user 사용자 정보 로드
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});
router.post('/', async (req, res, next) => { // POST /api/user 회원가입
  try {
    const existId = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (existId) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt rounds 10~13사이로 설정.
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
    });
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post('/logout', (req, res) => { // POST /api/user/logout
  req.logout();
  req.session.destroy();
  res.send('로그아웃 되었습니다.');
});
router.post('/login', (req, res, next) => { // POST /api/user/login
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
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
          attributes: ['id', 'nickname', 'userId'],
        });
        console.log(fullUser);
        return res.json(fullUser);
      } catch (e) {
        next(e);
      }
    })
  })(req, res, next);
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
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
      attributes: ['id', 'nickname'],
    });
    // newUser.Posts = newUser.Posts ? newUser.Posts.length : 0
    // newUser.Followings = newUser.Followings ? newUser.Followings.length : 0
    // newUser.Followers = newUser.Followers ? newUser.Followers.length : 0
    return res.json(user);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id/posts', async (req, res, next) => {
  try {
    let where = {};
    const lastId = parseInt(req.query.lastId, 10);
    if (lastId) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: lastId,
        },
        UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
      }
    } else {
        where = {
          UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
        }
    }
    const posts = await db.Post.findAll({
      where,
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Image,
      }, {
        model: db.User,
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: db.Comment,
      }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10),
    });
    return res.json(posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id }
    });
    await me.addFollowing(req.params.id);
    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id }
    });
    await me.removeFollowing(req.params.id);
    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
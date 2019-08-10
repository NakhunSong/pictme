const db = require('../models');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
}

exports.hasPost = async (req, res, next) => {
  const post = await db.Post.findOne({
    where: { id: req.params.id }
  });
  if (!post) {
    return res.status(404).send('게시물이 존재하지 않습니다.');
  } else {
    return next();
  }
}
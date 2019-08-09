const express = require('express');

const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

router.get('/:tag', isLoggedIn, async (req, res, next) => {
  try {
    const hashtagPosts = await db.Post.findAll({
      include: [{
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.tag) }
        }, {
          model: db.User,
          attribute: ['id', 'nickname'],
        }, {
          model: db.Image,
        }, {
          model: db.User,
          as: 'Likers',
          attribute: ['id'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return res.json(hashtagPosts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
const express = require('express');

const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
  try {
    let where = {};
    const lastId = parseInt(req.query.lastId);
    if (lastId) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: lastId,
        }
      }
    }
    const hashtagPosts = await db.Post.findAll({
      where,
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
      limit: parseInt(req.query.limit, 10),
    });
    return res.json(hashtagPosts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
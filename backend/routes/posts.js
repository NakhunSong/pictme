const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /api/posts 
  try {
    let where = {};
    const lastId = parseInt(req.query.lastId, 10);
    if (lastId) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: lastId, // lt : less than
        }
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

module.exports = router;
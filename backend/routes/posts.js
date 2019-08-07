const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /api/posts 
  try {
    const posts = await db.Post.findAll({
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Image,
      }],
      order: [['createdAt', 'DESC']],
    });
    return res.json(posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
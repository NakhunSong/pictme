const express = require('express');
const db = require('../models');

const router = express.Router();

const { isLoggedIn } = require('./middleware');

router.get('/', (req, res, next) => { // GET /api/post

});
router.post('/', isLoggedIn, async (req, res, next) => { // POST /api/post
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where: { 
          name: tag.slice(1).toLowerCase(),
        },
      })));
      console.log('POST post result: ', result);
      await newPost.addHashtags(result.map(r => r[0]));
    }
    const fullPost = await db.Post.findOne({
      where: {
        id: newPost.id,
      },
      include: [{
        model: db.User,
      }],
    });
    return res.json(fullPost);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
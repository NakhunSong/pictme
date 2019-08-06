const express = require('express');
const path = require('path');
const multer = require('multer');

const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, res, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자명
      const basename = path.basename(file.originalname, ext); // 확장자명 제거한 주소
      done(null, basename + new Date().valueOf() + ext); // date를 섞어 고유 이미지명으로 생성
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/images', upload.array('image'), (req, res) => { // POST /api/images
  res.json(req.files.map(v => v.filename));
});

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
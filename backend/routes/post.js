const express = require('express');
const path = require('path');
const multer = require('multer');

const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/post_image');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext); // abc.png -> ext: .png, .jpg, ... basename: abc
      done(null, basename + new Date().valueOf() + ext);
    },
  })
});

router.post('/images', upload.array('image'), (req, res) => { // POST /api/images 이미지 업로드 **upload.'array' : 파일 동시에 여러개 업로드 가능.
  res.json(req.files.map(v => v.filename));
});

router.get('/', (req, res, next) => { // GET /api/post

});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /api/ 게시물 작성 ** upload.'none' : 파일 업로드 생략
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
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { // 데이터 여러개일 경우
        const images = await Promise.all(req.body.image.map((image) => {
          return db.Image.create({ src: image });
        }));
        await newPost.addImages(images);
      } else { // 데이터 한개일 경우
        const image = await db.Image.create({ src: req.body.image });
        await newPost.addImage(image);
      }
    }
    const fullPost = await db.Post.findOne({
      where: {
        id: newPost.id,
      },
      include: [{
        model: db.User,
      }, {
        model: db.Image,
      }],
    });
    return res.json(fullPost);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
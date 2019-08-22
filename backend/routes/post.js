const express = require('express');
const path = require('path');
const multer = require('multer');

const db = require('../models');
const { isLoggedIn, hasPost } = require('./middleware');

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
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/images', upload.array('image'), (req, res) => { // POST /api/images 이미지 업로드 **upload.'array' : 파일 동시에 여러개 업로드 가능.
  return res.json(req.files.map(v => v.filename));
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

router.get('/:id', hasPost, async (req, res, next) => {
  try {
    const singlePost = await db.Post.findOne({
      where: { id: req.params.id },
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
      }]
    });
    return res.json(singlePost);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete('/:id', isLoggedIn, hasPost, async (req, res, next) => {
  try {
    await db.Post.destroy({
      where: { id: req.params.id }
    });
    res.status(200).send(req.params.id);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id/comments', hasPost, async (req, res, next) => {
  try {
    const comments = await db.Comment.findAll({
      where: { PostId: req.params.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }],
      order: [['createdAt', 'ASC']],
    });
    return res.json(comments);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id }
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시물입니다.');
    }
    const newComment = await db.Comment.create({
      content: req.body.content,
      UserId: req.user.id,
      PostId: req.params.id,
    });
    await post.addComment(newComment);
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }],
    });
    return res.json(comment);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id }
    });
    if (!post) {
      return res.status(401).send('포스트가 존재하지 않습니다.');
    }
    await post.addLiker(req.user.id);
    return res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id }
    });
    if (!post) {
      return res.status(401).send('포스트가 존재하지 않습니다.');
    }
    await post.removeLiker(req.user.id); 
    return res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
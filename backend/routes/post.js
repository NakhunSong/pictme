const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const db = require('../models');
const { isLoggedIn, hasPost } = require('./middleware');

const router = express.Router();

dotenv.config();
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'pictme',
    key(req, file, cb) {
      cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
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

router.post('/images', upload.array('image'), (req, res) => { // POST /api/images 이미지 업로드 **upload.'array' : 파일 동시에 여러개 업로드 가능.
  return res.json(req.files.map(v => v.location));
});

router.get('/:id', hasPost, async (req, res, next) => {
  try {
    const singlePost = await db.Post.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname', 'userId'],
      }, {
        model: db.Image,
      }, {
        model: db.User,
        through: 'Like',
        as: 'Likers',
        attributes: ['id', 'nickname'],
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
    const comments = await db.Comment.findAll({
      where: { PostId: parseInt(req.params.id, 10) }
    });
    if (comments){
      await db.Comment.destroy({
        where: { PostId: parseInt(req.params.id, 10) }
      });
    }
    const images = await db.Image.findAll({
      where: { PostId: parseInt(req.params.id, 10) }
    });
    if (images) {
      await db.Image.destroy({
        where: { PostId: parseInt(req.params.id, 10) }
      });
    }
    await db.Post.destroy({
      where: { id: parseInt(req.params.id, 10) }
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
    console.log('comments????????????????????????????', comments);
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
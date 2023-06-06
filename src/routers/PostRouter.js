import express from 'express';
import PostModel from '../../models/PostModel.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import Joi from '@hapi/joi';
import Jwt from 'jsonwebtoken';
import UserModel from '../../models/UserModel.js';
import { checkLogin } from '../middleware/checkAuthLogin.js';
import path from 'path';
import fs from 'fs';

import multer from 'multer';

var storage = multer.memoryStorage();

const router = express.Router();

const upload = multer({ storage: storage });

router.post('/', checkLogin, upload.single('image'), async (req, res) => {
  try {
    console.log(req.file);
    let post;
    const encodedImage = req.file.buffer.toString('base64');
    post = new PostModel({
      caption: req.body.caption,
      image: encodedImage,
      user: req.user,
    });

    const user = req.user;
    user.userPosts.push(post);
    user.save();
    const savedPost = await post.save();
    res.status(200).send(savedPost);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/all', async (req, res) => {
  try {
    const posts = await PostModel.find({}).populate('user').exec();
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.send(400).send(error);
  }
});

export default router;

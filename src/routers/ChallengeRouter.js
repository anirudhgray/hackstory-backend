import express from 'express';
import ChallengeModel from '../../models/ChallengeModel.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import Joi from '@hapi/joi';
import Jwt from 'jsonwebtoken';
import UserModel from '../../models/UserModel.js';
import { checkLogin } from '../middleware/checkAuthLogin.js';
import path from 'path';
import fs from 'fs';

import multer from 'multer';
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     var dirName = path.join(process.cwd(), './files/');
//     console.log(dirName);
//     if (!fs.existsSync(dirName)) {
//       fs.mkdirSync(dirName);
//     }
//     cb(null, dirName);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
var storage = multer.memoryStorage();

const router = express.Router();

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  console.log(req.file);
  let challenge;
  if (req.file) {
    const encodedImage = req.file.buffer.toString('base64');
    challenge = new ChallengeModel({
      title: req.body.title,
      clue: req.body.clue,
      image: encodedImage,
      region: req.body.region,
      points: req.body.points,
    });
  } else {
    challenge = new ChallengeModel({
      title: req.body.title,
      clue: req.body.clue,
      // image: encodedImage,
      region: req.body.region,
      points: req.body.points,
    });
  }

  try {
    const savedChallenge = await challenge.save();
    res.status(200).send(savedChallenge);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/all', async (req, res) => {
  try {
    const challenges = await ChallengeModel.find({});
    res.status(200).send(challenges);
  } catch (error) {
    console.log(error);
    res.send(400).send(error);
  }
});

router.patch('/challengecompleted/:id', checkLogin, async (req, res) => {
  const _id = req.params.id;

  try {
    const challenge = await ChallengeModel.findOne({ _id });
    if (!challenge) {
      return res.status(404).send();
    }
    const user = req.user;
    user.completedChallenges.push(challenge);
    user.points += challenge.points;
    user.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default router;

import express from 'express';
import UserModel from '../../models/UserModel.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import Joi from '@hapi/joi';
import Jwt from 'jsonwebtoken';

const router = express.Router();

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
  tourist: Joi.boolean().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post('/register', async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the user is allready in the db
  const emailExists = await UserModel.findOne({ email: req.body.email });

  if (emailExists) return res.status(400).send('Email allready exists');

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    tourist: req.body.tourist,
  });

  try {
    const savedUserModel = await user.save();
    const token = Jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res
      .header('auth-token', token)
      .send({ token: token, user: savedUserModel });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) return res.status(400).send('Email or password is wrong');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Email or password is wrong');

  //Create and assign a token
  const token = Jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({ token: token, user });
});

export default router;

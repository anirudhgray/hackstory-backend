import Jwt from 'jsonwebtoken';
import UserModel from '../../models/UserModel.js';

export const checkLogin = async (req, res, next) => {
  try {
    // getting logged in user deets
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token);
    const decoded = Jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('decoded', decoded);

    const user = await UserModel.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(404).send;
    }
    req.token = token;
    req.user = user;
    req.userID = user._id;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Auth error!' });
  }
};

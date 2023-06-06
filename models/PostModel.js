import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model('Post', postSchema);

export default postModel;

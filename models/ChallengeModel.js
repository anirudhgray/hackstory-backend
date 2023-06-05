import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    clue: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    points: {
      type: Number,
      required: false,
      default: 0,
    },
    region: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const challengeModel = mongoose.model('Challenge', challengeSchema);

export default challengeModel;

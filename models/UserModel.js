import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tourist: {
      type: Boolean,
      required: true,
      default: false,
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    completedChallenges: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Challenge',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// pasteSchema.methods.toJSON = function () {
//   const pasteObject = this.toObject();
//   delete pasteObject.password;
//   return pasteObject;
// };

// pasteSchema.pre('save', async function (next) {
//   if (this.isModified('password') && this.protected) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
//   next();
// });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

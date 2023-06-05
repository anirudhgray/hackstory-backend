import mongoose from 'mongoose';

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
    password: {
      type: String,
      required: true,
      min: 8,
    },
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

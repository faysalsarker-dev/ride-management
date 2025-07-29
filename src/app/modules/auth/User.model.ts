import { Schema, model } from 'mongoose';
import { IUser } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config/config';

const userSchema = new Schema<IUser>( {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ['rider', 'driver', 'admin'],
      default: 'rider',
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isApproved: {
      type: Boolean,
      default: false, 
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  });





userSchema.pre<IUser>('save', async function (next) {
   const salt = await bcrypt.genSalt(config.bcrypt_salt_rounds || 10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('User', userSchema);
export default User;

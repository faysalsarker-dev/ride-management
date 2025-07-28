import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import { IUser } from './auth.interface';
import { ApiError } from '../../errors/ApiError';
import User from './User.model';

export const AuthService = {

  registerUser: async (payload: IUser) => {
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) throw new ApiError(409, 'Email already taken');

    const hashedPassword = await bcrypt.hash(payload.password, config.bcrypt_salt_rounds);
    const user = new User({ ...payload, password: hashedPassword });
    await user.save();

    return user;
  },


  loginUser: async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(401, 'Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new ApiError(401, 'Invalid email or password');

    const token = jwt.sign(
      { id: user._id },
      String(config.jwt.secret),
      { expiresIn: String(config.jwt.expires_in) }
    );

    return { user, token };
  },
};

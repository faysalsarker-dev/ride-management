import { IUser } from './auth.interface';
import { ApiError } from '../../errors/ApiError';
import User from './User.model';
import { generateToken } from '../../utils/jwt';

export const AuthService = {

  registerUser: async (payload: IUser) => {
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) throw new ApiError(409, 'Email already exists');
    const user = new User({ ...payload });
    await user.save();
    const token = generateToken({...user,_id:user._id.toString()});
    return {user,token};
  },


  loginUser: async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(401, 'Invalid email or password');
 const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password');
    }
    const token = generateToken({...user,_id:user._id.toString()});
    return { user ,token};
  },
};

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


  
  getMe: async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, 'User not found');
    return user;
  },


  update: async (userId: string, payload: Partial<IUser>) => {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: payload },
      { new: true }
    );
    if (!user) throw new ApiError(404, 'User not found');
    return user;
  },




  changePassword: async (userId: string, payload: { oldPassword: string, newPassword: string }) => {

    const { oldPassword, newPassword } = payload;

    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, 'User not found');

 const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password');
    }
    user.password = newPassword;
    await user.save();
 
    return user;
  },



  driverOnline: async (userId: string) => {

   
    const user = await User.findById(userId);
    if (!user || user.role !== "driver") throw new ApiError(404, 'User not found');

    if (user.driverProfile) {
      user.driverProfile.isOnline = !user.driverProfile.isOnline;
    }
    await user.save();
 
    return user;
  },








};

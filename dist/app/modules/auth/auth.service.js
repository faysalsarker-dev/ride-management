"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const ApiError_1 = require("../../errors/ApiError");
const User_model_1 = __importDefault(require("./User.model"));
const jwt_1 = require("../../utils/jwt");
exports.AuthService = {
    registerUser: async (payload) => {
        const existingUser = await User_model_1.default.findOne({ email: payload.email });
        if (existingUser)
            throw new ApiError_1.ApiError(409, 'Email already exists');
        const user = new User_model_1.default({ ...payload });
        await user.save();
        const token = (0, jwt_1.generateToken)({ ...user, _id: user._id.toString() });
        return { user, token };
    },
    loginUser: async (email, password) => {
        const user = await User_model_1.default.findOne({ email });
        if (!user)
            throw new ApiError_1.ApiError(401, 'Invalid email or password');
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError_1.ApiError(401, 'Invalid email or password');
        }
        const token = (0, jwt_1.generateToken)({ ...user, _id: user._id.toString() });
        return { user, token };
    },
    getMe: async (userId) => {
        const user = await User_model_1.default.findById(userId);
        if (!user)
            throw new ApiError_1.ApiError(404, 'User not found');
        return user;
    },
    update: async (userId, payload) => {
        const user = await User_model_1.default.findByIdAndUpdate(userId, { $set: payload }, { new: true });
        if (!user)
            throw new ApiError_1.ApiError(404, 'User not found');
        return user;
    },
    changePassword: async (userId, payload) => {
        const { oldPassword, newPassword } = payload;
        const user = await User_model_1.default.findById(userId);
        if (!user)
            throw new ApiError_1.ApiError(404, 'User not found');
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            throw new ApiError_1.ApiError(401, 'Invalid email or password');
        }
        user.password = newPassword;
        await user.save();
        return user;
    },
    driverOnline: async (userId) => {
        const user = await User_model_1.default.findById(userId);
        if (!user || user.role !== "driver")
            throw new ApiError_1.ApiError(404, 'User not found');
        if (user.driverProfile) {
            user.driverProfile.isOnline = !user.driverProfile.isOnline;
        }
        await user.save();
        return user;
    },
};

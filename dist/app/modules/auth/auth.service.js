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
};

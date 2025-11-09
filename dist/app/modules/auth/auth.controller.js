"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const setCookie_1 = require("../../utils/setCookie");
exports.AuthController = {
    register: async (req, res, next) => {
        try {
            const { user, token } = await auth_service_1.AuthService.registerUser(req.body);
            (0, setCookie_1.setCookie)(res, token);
            (0, sendResponse_1.default)(res, {
                statusCode: 201,
                success: true,
                message: "User registered successfully",
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            console.log(email, password);
            const { user, token } = await auth_service_1.AuthService.loginUser(email, password);
            (0, setCookie_1.setCookie)(res, token);
            (0, sendResponse_1.default)(res, {
                statusCode: 200,
                success: true,
                message: "Login successful",
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    },
    logout: async (_req, res) => {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "User Logged Out Successfully",
            data: null,
        });
    },
    me: async (req, res) => {
        const decodedToken = req.user._id;
        const result = await auth_service_1.AuthService.getMe(decodedToken);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Your profile Retrieved Successfully",
            data: result
        });
    },
    update: async (req, res) => {
        const decodedToken = req.user._id;
        const result = await auth_service_1.AuthService.update(decodedToken, req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Your profile Update Successfully",
            data: result
        });
    },
    changePassword: async (req, res) => {
        const decodedToken = req.user._id;
        const result = await auth_service_1.AuthService.changePassword(decodedToken, req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Your profile Update Successfully",
            data: result
        });
    },
    driverOnline: async (req, res) => {
        const decodedToken = req.user._id;
        const result = await auth_service_1.AuthService.driverOnline(decodedToken);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Your profile Update Successfully",
            data: result
        });
    },
};

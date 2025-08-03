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
};

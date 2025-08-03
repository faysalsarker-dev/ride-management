"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_middleware_1 = __importDefault(require("../../middleware/validateRequest.middleware"));
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post('/register', (0, validateRequest_middleware_1.default)(auth_validation_1.AuthValidation.register), auth_controller_1.AuthController.register);
router.post('/login', (0, validateRequest_middleware_1.default)(auth_validation_1.AuthValidation.login), auth_controller_1.AuthController.login);
exports.default = router;

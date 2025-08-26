"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_middleware_1 = __importDefault(require("../../middleware/validateRequest.middleware"));
const auth_validation_1 = require("./auth.validation");
const CheckAuth_1 = require("../../middleware/CheckAuth");
const auth_interface_1 = require("./auth.interface");
const router = (0, express_1.Router)();
router.post('/register', (0, validateRequest_middleware_1.default)(auth_validation_1.AuthValidation.register), auth_controller_1.AuthController.register);
router.post('/login', (0, validateRequest_middleware_1.default)(auth_validation_1.AuthValidation.login), auth_controller_1.AuthController.login);
router.post('/logout', auth_controller_1.AuthController.logout);
router.get('/me', (0, CheckAuth_1.checkAuth)([...auth_interface_1.UserRoles.ADMIN, auth_interface_1.UserRoles.DRIVER, auth_interface_1.UserRoles.RIDER]), auth_controller_1.AuthController.me);
router.put('/update', (0, CheckAuth_1.checkAuth)([...auth_interface_1.UserRoles.ADMIN, auth_interface_1.UserRoles.DRIVER, auth_interface_1.UserRoles.RIDER]), auth_controller_1.AuthController.update);
router.put('/change-password', (0, CheckAuth_1.checkAuth)([...auth_interface_1.UserRoles.ADMIN, auth_interface_1.UserRoles.DRIVER, auth_interface_1.UserRoles.RIDER]), auth_controller_1.AuthController.changePassword);
exports.default = router;

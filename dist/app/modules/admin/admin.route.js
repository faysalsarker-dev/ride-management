"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const CheckAuth_1 = require("../../middleware/CheckAuth");
const auth_interface_1 = require("../auth/auth.interface");
const router = express_1.default.Router();
router.get('/all-riders', (0, CheckAuth_1.checkAuth)([auth_interface_1.UserRoles.ADMIN]), admin_controller_1.AdminUserController.getAllUsers);
router.get('/all-drivers', (0, CheckAuth_1.checkAuth)([auth_interface_1.UserRoles.ADMIN]), admin_controller_1.AdminUserController.getAllDrivers);
router.get('/user-summary', (0, CheckAuth_1.checkAuth)([auth_interface_1.UserRoles.ADMIN]), admin_controller_1.AdminUserController.getSummary);
router.patch('/drivers/approve/:id', (0, CheckAuth_1.checkAuth)([auth_interface_1.UserRoles.ADMIN]), admin_controller_1.AdminUserController.updateApprovalStatus);
router.patch('/users/:id', (0, CheckAuth_1.checkAuth)([auth_interface_1.UserRoles.ADMIN]), admin_controller_1.AdminUserController.updateUserById);
router.delete('/users/:id', (0, CheckAuth_1.checkAuth)([auth_interface_1.UserRoles.ADMIN]), admin_controller_1.AdminUserController.deleteUserById);
exports.default = router;

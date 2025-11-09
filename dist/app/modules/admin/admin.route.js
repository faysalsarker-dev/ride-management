"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get('/users', admin_controller_1.AdminController.getUsers);
router.patch('/users/:id', admin_controller_1.AdminController.updateUser);
router.patch('/users/:id/block', admin_controller_1.AdminController.toggleBlock);
router.patch('/drivers/:id/approval', admin_controller_1.AdminController.approveDriver);
router.delete('/users/:id', admin_controller_1.AdminController.deleteUser);
router.get('/rides', admin_controller_1.AdminController.getRides);
router.get('/dashboard', admin_controller_1.AdminController.getDashboard);
router.patch('/profile', admin_controller_1.AdminController.updateProfile);
router.patch('/profile/password', admin_controller_1.AdminController.updatePassword);
exports.default = router;

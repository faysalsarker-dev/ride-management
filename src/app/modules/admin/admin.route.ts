import express from 'express';
import { AdminUserController } from './admin.controller';
import { checkAuth } from '../../middleware/CheckAuth';
import { UserRoles } from '../auth/auth.interface';

const router = express.Router();

router.get('/all-riders',checkAuth([UserRoles.ADMIN]), AdminUserController.getAllUsers);
router.get('/all-drivers',checkAuth([UserRoles.ADMIN]), AdminUserController.getAllDrivers);
router.get('/user-summary',checkAuth([UserRoles.ADMIN]), AdminUserController.getSummary);
router.patch('/drivers/approve/:id',checkAuth([UserRoles.ADMIN]), AdminUserController.updateApprovalStatus);
router.patch('/users/:id',checkAuth([UserRoles.ADMIN]), AdminUserController.updateUserById);
router.delete('/users/:id',checkAuth([UserRoles.ADMIN]), AdminUserController.deleteUserById);

export default router;

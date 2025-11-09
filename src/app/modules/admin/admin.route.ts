import express from 'express';
import { AdminController } from './admin.controller';
import { checkAuth } from '../../middleware/CheckAuth';
import { UserRoles } from '../auth/auth.interface';


const router = express.Router();

router.get('/users',  AdminController.getUsers);
router.patch('/users/:id',  AdminController.updateUser);
router.patch('/users/:id/block',  AdminController.toggleBlock);
router.patch('/drivers/:id/approval',  AdminController.approveDriver);
router.delete('/users/:id',  AdminController.deleteUser);

router.get('/rides',  AdminController.getRides);
router.get('/dashboard',  AdminController.getDashboard);

router.patch('/profile',  AdminController.updateProfile);
router.patch('/profile/password',  AdminController.updatePassword);

export default  router;

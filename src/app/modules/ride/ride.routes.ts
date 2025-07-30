import express from 'express';
import { RideController } from './ride.controller';
import validateRequest from '../../middleware/validateRequest.middleware';
import { createRideSchema, updateRideStatusSchema } from './ride.validation';
import { verifyToken } from '../../utils/jwt';
import { checkAuth } from '../../middleware/CheckAuth';
import { UserRoles } from '../auth/auth.interface';


const router = express.Router();

router.post(
  '/',
  checkAuth(UserRoles.RIDER),
//  validateRequest(createRideSchema),
  RideController.createRide
);

router.get('/',  RideController.getAllRides);
router.get('/:id', RideController.getSingleRide);

router.patch(
  '/:id/status',
  verifyToken,
  validateRequest(updateRideStatusSchema),
  RideController.updateRideStatus
);

router.delete('/:id',   checkAuth(UserRoles.RIDER),
 RideController.deleteRide);

export default  router;

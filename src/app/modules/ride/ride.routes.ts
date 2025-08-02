import express from 'express';
import validateRequest from '../../middleware/validateRequest.middleware';
import { createRideSchema, updateRideSchema, updateRideStatusSchema } from './ride.validation';
import { checkAuth } from '../../middleware/CheckAuth';
import { UserRoles } from '../auth/auth.interface';
import { RideController } from './ride.controller';

const router = express.Router();

router.post(
  '/',
  checkAuth([UserRoles.RIDER,UserRoles.ADMIN]),
  validateRequest(createRideSchema),
  RideController.createRide
);

router.get(
  '/',
checkAuth([UserRoles.RIDER,UserRoles.ADMIN]),  RideController.getAllRides
);

router.get(
  '/available',
  checkAuth([UserRoles.DRIVER, UserRoles.ADMIN]),
  RideController.getAvailableRides
);



router.get(
  '/:rideId',
 checkAuth([UserRoles.RIDER,UserRoles.ADMIN]),
  RideController.getSingleRide
);

router.patch(
  '/:rideId',
checkAuth([UserRoles.RIDER,UserRoles.ADMIN]),
  validateRequest(updateRideSchema),
  RideController.updateRide
);

router.delete(
  '/:rideId',
  checkAuth([UserRoles.RIDER,UserRoles.ADMIN]),
  RideController.deleteRide
);


// need to explain 
router.post(
  '/:rideId/cancel',
  checkAuth([UserRoles.RIDER, UserRoles.DRIVER, UserRoles.ADMIN]),
  RideController.cancelRide
);



router.post(
  '/:rideId/accept',
  checkAuth([UserRoles.DRIVER]),
  RideController.acceptRide
);

router.patch(
  '/:rideId/status',
  checkAuth([UserRoles.DRIVER]),
  validateRequest(updateRideStatusSchema),
  RideController.updateRideStatus
);



export default router;

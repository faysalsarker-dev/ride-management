import express from 'express';
import { HistoryController } from './history.controller';
import validateRequest from '../../middleware/validateRequest.middleware';
import { driverFeedbackSchema, riderFeedbackSchema, updateHistorySchema } from './history.validation';
import { checkAuth } from '../../middleware/CheckAuth';
import { UserRoles } from '../auth/auth.interface';


const router = express.Router();

router.get('/', HistoryController.getAll);
router.patch(
  '/rider-feedback/:rideId',
  checkAuth([UserRoles.RIDER]),
  validateRequest(riderFeedbackSchema),
  HistoryController.updateRiderFeedback
);

router.patch(
  '/driver-feedback/:rideId',
    checkAuth([UserRoles.DRIVER]),
  validateRequest(driverFeedbackSchema),
  HistoryController.updateDriverFeedback
);


router.get('/:id', HistoryController.getById);

router.patch('/:id', validateRequest(updateHistorySchema), HistoryController.update);

router.delete('/:id', HistoryController.delete);

export default router;

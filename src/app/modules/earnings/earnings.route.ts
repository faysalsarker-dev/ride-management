import express from 'express';
import { EarningsController } from './earnings.controller';
import validateRequest from '../../middlewares/validateRequest';
import { EarningsValidation } from './earnings.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(EarningsValidation.create),
  EarningsController.createEarning
);

router.get('/', EarningsController.getAllEarnings);

router.get('/:id', EarningsController.getSingleEarning);

router.delete('/:id', EarningsController.deleteEarning);

export const EarningsRoutes = router;

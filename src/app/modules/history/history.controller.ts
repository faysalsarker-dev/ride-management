import { Request, Response } from 'express';

import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { HistoryService } from './history.service';

export const HistoryController = {
  getAll: catchAsync(async (req: Request, res: Response) => {
    const result = await HistoryService.getAllHistories();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Histories retrieved successfully',
      data: result,
    });
  }),

  getById: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await HistoryService.getSingleHistory(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'History retrieved successfully',
      data: result,
    });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const result = await HistoryService.updateHistory(id, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'History updated successfully',
      data: result,
    });
  }),

  delete: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await HistoryService.deleteHistory(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'History deleted successfully',
      data: result,
    });
  }),


updateRiderFeedback: catchAsync(async (req: Request, res: Response) => {
  const { rideId } = req.params;
  const updated = await HistoryService.updateRiderFeedback(rideId, req.body,req.user._id);
sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rider feedback submitted',
    data: updated,
  });
}),

updateDriverFeedback: catchAsync(async (req: Request, res: Response) => {
  const { rideId } = req.params;

  const updated = await HistoryService.updateDriverFeedback(rideId, req.body,req.user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver feedback submitted',
    data: updated,
  });
}),







};

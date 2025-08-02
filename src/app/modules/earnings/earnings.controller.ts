import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { EarningsService } from './earnings.service';

export const EarningsController = {
  createEarning: async (req: Request, res: Response) => {
    const result = await EarningsService.createEarning(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Earning record created successfully',
      data: result,
    });
  },

  getAllEarnings: async (req: Request, res: Response) => {
    const result = await EarningsService.getAllEarnings();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Earnings fetched successfully',
      data: result,
    });
  },

  getSingleEarning: async (req: Request, res: Response) => {
    const result = await EarningsService.getSingleEarning(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Earning fetched successfully',
      data: result,
    });
  },

  deleteEarning: async (req: Request, res: Response) => {
    const result = await EarningsService.deleteEarning(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Earning deleted successfully',
      data: result,
    });
  },
};

    const result = await EarningsService.createEarning(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Earning record created successfully',
      data: result,
    });
  }),

  getAllEarnings: catchAsync(async (req: Request, res: Response) => {
    const result = await EarningsService.getAllEarnings();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Earnings fetched successfully',
      data: result,
    });
  }),

  getSingleEarning: catchAsync(async (req: Request, res: Response) => {
    const result = await EarningsService.getSingleEarning(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Earning fetched successfully',
      data: result,
    });
  }),

  deleteEarning: catchAsync(async (req: Request, res: Response) => {
    const result = await EarningsService.deleteEarning(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Earning deleted successfully',
      data: result,
    });
  }),
};

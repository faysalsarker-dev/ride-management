import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendResponse';

export const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthService.registerUser(req.body);
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.loginUser(email, password);
      res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Login successful',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};

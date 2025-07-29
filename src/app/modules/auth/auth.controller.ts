import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import { generateToken } from "../../utils/jwt";
import { setCookie } from "../../utils/setCookie";

export const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, token } = await AuthService.registerUser(req.body);
      setCookie(res, token);
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
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
      setCookie(res, token);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Login successful",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};

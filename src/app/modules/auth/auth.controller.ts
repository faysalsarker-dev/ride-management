import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
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
      console.log(email,password);
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



logout: async (_req: Request, res: Response) => {
  res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Logged Out Successfully",
    data: null,
  });
},

me: async (req: Request, res: Response) => {
  const decodedToken = req.user._id;
  const result = await AuthService.getMe(decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your profile Retrieved Successfully",
    data: result
  });
},


update: async (req: Request, res: Response) => {
  const decodedToken = req.user._id;
  const result = await AuthService.update(decodedToken,req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your profile Update Successfully",
    data: result
  });
},


changePassword: async (req: Request, res: Response) => {
  const decodedToken = req.user._id;
  const result = await AuthService.changePassword(decodedToken,req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your profile Update Successfully",
    data: result
  });
},


driverOnline: async (req: Request, res: Response) => {
  const decodedToken = req.user._id;
  const result = await AuthService.driverOnline(decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your profile Update Successfully",
    data: result
  });
},







};

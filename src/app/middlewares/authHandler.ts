import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { JwtHelpers } from '../../helpers/JwtHelpers';
import ApiError from '../../errors/ApiError';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get access token from header
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      // verify token
      const decoded = JwtHelpers.verifyToken(
        accessToken,
        config.jwt.secret as Secret,
      );
      req.user = decoded;
      // guard with role
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;

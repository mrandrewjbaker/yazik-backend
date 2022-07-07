import StatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import { cookieProps } from "@routes/auth-router";
import jwtUtil from "@util/jwt-util";

const { UNAUTHORIZED } = StatusCodes;
const jwtNotPresentErr = "Unauthorized: JWT not present in request.";

export async function checkUserAuthState(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const jwt = req.signedCookies[cookieProps.key];
    console.log(req.signedCookies[cookieProps.key]);
    if (!jwt) {
      throw Error(jwtNotPresentErr);
    }
    const clientData = await jwtUtil.decode(jwt);
    if (typeof clientData === "object") {
      res.locals.sessionUser = clientData;
      next();
    } else {
      throw Error(jwtNotPresentErr);
    }
  } catch (err) {
    return res.status(UNAUTHORIZED).json({
      error: err.message,
    });
  }
}

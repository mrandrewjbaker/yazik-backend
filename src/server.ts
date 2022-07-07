import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import StatusCodes from "http-status-codes";
import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";

import BaseRouter from "./routes/api";
import logger from "jet-logger";
import { cookieProps } from "@routes/auth-router";
import { CustomError } from "@shared/errors";
import { checkUserAuthState } from "@routes/middleware";

const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieProps.secret));

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use("/api", BaseRouter);
app.use(checkUserAuthState);

app.use(
  (err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status =
      err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
    return res.status(status).json({
      error: err.message,
    });
  }
);

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "root endpoint" });
});

export default app;

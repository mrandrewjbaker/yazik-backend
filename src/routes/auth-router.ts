import authService from "@services/auth-service";
import { ParamMissingError } from "@shared/errors";
import jwtUtil from "@util/jwt-util";
import { Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";

const router = Router();
const { OK } = StatusCodes;

export const p = {
  login: "/login",
  logout: "/logout",
  signup: "/signup",
} as const;

export const cookieProps = Object.freeze({
  key: "JWT_TOKEN",
  secret: process.env.COOKIE_SECRET,
  options: {
    httpOnly: true,
    signed: false,
    path: process.env.COOKIE_PATH,
    maxAge: Number(process.env.COOKIE_EXP),
    origin: process.env.COOKIE_DOMAIN,
    secure: process.env.SECURE_COOKIE === "true",
  },
});
console.log(
  process.env.COOKIE_PATH,
  Number(process.env.COOKIE_EXP),
  process.env.COOKIE_DOMAIN
);

router.post(p.signup, async (req: Request, res: Response) => {
  const { email, password, confirmPassword, username } = req.body;

  if (!email || !password || !username || !confirmPassword) {
    throw new ParamMissingError();
  }
  const user = await authService.signup({
    email,
    password,
    username,
    confirmPassword,
  });

  const jwt = jwtUtil.sign({
    id: user.id,
    email: user.email,
    username: user.username,
    password: user.password,
  });

  const { key, options } = cookieProps;
  res.cookie(key, jwt, options);

  res.send(user);
});

router.post(p.login, async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    throw new ParamMissingError();
  }

  const jwt = await authService.login(username, password);
  const { key, options } = cookieProps;

  res.cookie(key, jwt, options);
  return res.status(OK).end();
});

router.get(p.logout, (_: Request, res: Response) => {
  const { key, options } = cookieProps;
  res.clearCookie(key, options);
  return res.status(OK).end();
});

export default router;

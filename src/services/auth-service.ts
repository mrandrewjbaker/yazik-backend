import bcrypt from "bcrypt";
import sequelize from "@models/index";
import { User } from "@models/user-model";

import jwtUtil from "@util/jwt-util";
import {
  UnauthorizedError,
  InvalidPasswordError,
  UsernameAlreadyExists,
  EmailAlreadyExits,
} from "@shared/errors";
import { IUser } from "@util/types";

type SignupProps = Omit<IUser, "id"> & {
  confirmPassword: string;
};

async function signup({
  email,
  password,
  confirmPassword,
  username,
}: SignupProps): Promise<IUser> {
  await sequelize.authenticate();
  const user = await User.findOne({ where: { username } });

  if (user) {
    if (user.email === email) {
      throw new EmailAlreadyExits();
    } else {
      throw new UsernameAlreadyExists();
    }
  } else {
    const user = await User.findOne({ where: { email } });
    if (user) {
      if (user.email === email) {
        throw new EmailAlreadyExits();
      } else {
        throw new UsernameAlreadyExists();
      }
    }
  }

  if (password !== confirmPassword) {
    throw new InvalidPasswordError();
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPwd,
    username,
  });
  return newUser;
}

async function login(username: string, password: string): Promise<string> {
  // Fetch user
  await sequelize.authenticate();
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new UnauthorizedError();
  }

  const pwdPassed = await bcrypt.compare(password, user.password);
  if (!pwdPassed) {
    throw new UnauthorizedError();
  }

  return jwtUtil.sign({
    id: user.id,
    email: user.email,
    username: user.username,
    password: user.password,
  });
}

export default {
  login,
  signup,
} as const;

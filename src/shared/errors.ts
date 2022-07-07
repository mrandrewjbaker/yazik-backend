import HttpStatusCodes from "http-status-codes";

export abstract class CustomError extends Error {
  public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor(msg: string, httpStatus: number) {
    super(msg);
    this.HttpStatus = httpStatus;
  }
}

export class ParamMissingError extends CustomError {
  public static readonly Msg =
    "One or more of the required parameters was missing.";
  public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor() {
    super(ParamMissingError.Msg, ParamMissingError.HttpStatus);
  }
}

export class UserNotFoundError extends CustomError {
  public static readonly Msg =
    "A user with the given id does not exists in the database.";
  public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

  constructor() {
    super(UserNotFoundError.Msg, UserNotFoundError.HttpStatus);
  }
}

export class UnauthorizedError extends CustomError {
  public static readonly Msg = "Login failed";
  public static readonly HttpStatus = HttpStatusCodes.UNAUTHORIZED;

  constructor() {
    super(UnauthorizedError.Msg, UnauthorizedError.HttpStatus);
  }
}

export class EmailAlreadyExits extends CustomError {
  public static readonly Msg = "Email already exits";
  public static readonly HttpStatus = HttpStatusCodes.CONFLICT;

  constructor() {
    super(EmailAlreadyExits.Msg, EmailAlreadyExits.HttpStatus);
  }
}

export class UsernameAlreadyExists extends CustomError {
  public static readonly Msg = "Username already exists";
  public static readonly HttpStatus = HttpStatusCodes.CONFLICT;

  constructor() {
    super(UsernameAlreadyExists.Msg, UsernameAlreadyExists.HttpStatus);
  }
}

export class InvalidPasswordError extends CustomError {
  public static readonly Msg = "Passwords do not match";
  public static readonly HttpStatus = HttpStatusCodes.CONFLICT;

  constructor() {
    super(InvalidPasswordError.Msg, InvalidPasswordError.HttpStatus);
  }
}

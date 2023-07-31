import { ValidationChain, body } from "express-validator";

export interface IsRefresh {
  check: boolean;
  refreshToken: string;
  roles: string[] | undefined;
}

export interface LoginInfo {
  usernameOrEmail: string;
  password: string;
}

export interface AccessTokenCheck {
  header: string | undefined;
  checkExpire: boolean;
}

export interface ForgottenPassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export const validateSignUp: ValidationChain[] = [
  body("usernameOrEmail")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Email or Username is required"),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password is required"),
];

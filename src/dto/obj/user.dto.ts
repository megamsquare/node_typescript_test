import { Request } from "express";
import { ValidationChain, body } from "express-validator";

export interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface UserRequest extends Request {
  user?: { userId: string; role: string[] };
}

export interface UpdateUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

export interface UpdatePassword {
  userId: string;
  password: string;
}

export const validateNewUser: ValidationChain[] = [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("first name is required"),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("last name is required"),
  body("email").trim().isEmail().withMessage("email is required"),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username is required"),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("password is required"),
];

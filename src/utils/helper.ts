import get from "lodash/get";
import * as Jwt from "jsonwebtoken";
import config from "@config/index"
import { IUser } from "@models/User";

//To generate new JWT token
export const createJwtAuthToken = (user: IUser) => {
  const contents = {
    _id: get(user, "_id", ""),
    name: get(user, "firstName", ""),
    email: get(user, "email", ""),
    role: get(user, "role", "user"),
    createdAt: Date.now()
  }
  const jwtSecret = config.app.jwtSecret;
  const jwtExpiration = config.app.jwtExpiration;
  return Jwt.sign(contents, jwtSecret, { expiresIn: jwtExpiration  });
};

// For validate email
export const checkEmailFormat = (email: string) => {
  // Regular expression to validate email
  const emailRegex: any = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  const response: any = {};

  try {
    const isEmail: boolean = emailRegex.test(email);
    if (isEmail) {
      response.status = isEmail;
      response.message = "Email is valid";
    } else {
      response.status = isEmail;
      response.message = "Email is not valid";
    }
    return response;
  } catch (error) {
    response.status = false;
    response.message = "Email is not valid";
    return response;
  }
};

// Verfication token and decode token return user information
export const verifyToken = (token: string) => {
  try {
    const decoded = Jwt.verify(token, config.app.jwtSecret)
    return {
      isAuth: true,
      message: "Token decode successfully.",
      user: decoded
    }
  } catch (e) {
    return {
      isAuth: false,
      message: "Authentication Error",
      user: null
    }
  }
}

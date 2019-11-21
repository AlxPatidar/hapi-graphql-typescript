import { ILoginRequest } from "@utils/types/request";
import AuthController from "./AuthController"

const authController: AuthController = new AuthController();

export default {
  Query: {
    // Login with email and passowrd in args also called arguments
    login: async (_: any, args: ILoginRequest) => {
      // Call login method on instace of auth controller
      return authController.login(args)
    }
  }
}
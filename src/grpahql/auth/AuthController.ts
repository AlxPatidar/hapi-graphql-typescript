import * as _ from "lodash";
import Bcrypt from "bcryptjs"
import { IUser, User } from "@models/User";
import { ILoginRequest } from "@utils/types/request";
import * as Helper from "@utils/helper"
// import * as Validation from "./Validation"

export default class TaskController {

  public async login(payload: ILoginRequest) {
    const { errors, isValid } = Validation.loginValidation(payload)
    if (!isValid) {
      return { success: false, message: errors[0], data: {} }
    }
    try {
      // Check user exists with this email address
      const user: IUser | null = await User.findOne({ email: payload.email }, { updateAt: 0 })
      if (user) {
        // If user present then check passowrd with related user
        const passwordCheck = await Bcrypt.compare(payload.password, user.password)
        if (passwordCheck) {
          // If password match return token and some basic details of user
          const token: string = Helper.createJwtAuthToken(user)
          return { success: true, message: "Logged-in successfully.", token, data: user }
        } else {
          return { success: false, message: "Wrong Password. Please try again.", token: "", data: {} }
        }
      } else {
        return { success: false, message: "Login email not found. Please register.", token: "", data: {} }
      }
    } catch (error) {
      return { success: false, message: error.message, token: "", data: {} }
    }
  }
}
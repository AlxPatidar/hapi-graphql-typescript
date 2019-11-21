import { ILoginRequest } from "@utils/types/request";

// A function return boolean for every for type on empty
const isEmpty = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  )
}

// Login validation on email, password
export const loginValidation = (data: ILoginRequest) => {
  const errors: Array<string> = []
  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""

  // check email id is present or not
  if (isEmpty(data.email)) {
    errors.push("Email is required")
  }
  const emailRegex: any = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  // Check valid email id
  if (!emailRegex.test(data.email)) {
    errors.push("Email is invalid")
  }
  // check length is present or not
  if (isEmpty(data.password)) {
    errors.push("Password is required")
  }
  // check length of password length between 6 to 20
  if (data.password.length > 6 && data.password.length < 30) {
    errors.push("Password must have 6 chars")
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}


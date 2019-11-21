export default `
  extend type Query {
    login(email: String, password: String): LoginResponse
  }
  type LoginResponse {
    success: Boolean
    message: String
    token: String
    data: User
  }
  type User {
    _id: String
    name: String
    email: String
    role: String
    createdAt: DateTime
  }
`
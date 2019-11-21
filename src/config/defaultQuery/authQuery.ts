import Config from "@config/index"

const endpoint = Config.graphql.url

const loginQuery = `{
  login(email: "ashokpatidar80@gmail.com", password: "123456") {
    success
    message
    token
    data {
      _id
      name
      email
      role
      createdAt
    }
  }
}`

const authQuery = [
  {
    endpoint,
    name: "Login",
    query: loginQuery
  }
]

export default authQuery
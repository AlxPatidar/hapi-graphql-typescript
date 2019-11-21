export default `
  scalar JSON
  scalar Date
  scalar Time
  scalar DateTime
  type JSONResponse {
    success: Boolean
    message: String
    data: JSON
  }
  type Query {
     hello: String
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`
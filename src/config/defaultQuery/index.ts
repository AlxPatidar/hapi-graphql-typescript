import todosQuery from "./todoQuery"
import basicQuery from "./basicQuery"
import authQuery from "./authQuery"

export default [
  ...basicQuery,
  ...authQuery,
  ...todosQuery
]

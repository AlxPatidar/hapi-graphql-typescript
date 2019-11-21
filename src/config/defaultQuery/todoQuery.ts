import Config from "@config/index"

const endpoint = Config.graphql.url

const response = `
    success
    message
    data {
      todoId
      user {
        name
        email
        role
      }
      title
      completed
      createdAt
    }
`
const fetchTodos = `{
  fetchTodos { ${response} }
}`
const createTodo = `mutation {
  createTodo(
    title: "create Testing todo"
  ) { ${response} }
}`
const updateTodo = `mutation {
  updateTodo(
    todoId: "5dd620c9612ed34beee85ba7"
    title: "create Testing todo"
    status: true
    completed: true
  ) { ${response} }
}`
const fetchTodoById = `{
  fetchTodoById(todoId: "5c07a407b371c5e0523046a9") { ${response} }
}`
const deleteTodoById = `{
  deleteTodoById(todoId: "5c07a407b371c5e0523046b3") { ${response} }
}`

const todoQuery = [
  {
    endpoint,
    name: "Create todos",
    headers: { authorization: "token" },
    query: createTodo
  },
  {
    endpoint,
    name: "Fetch todos",
    headers: { authorization: "token" },
    query: fetchTodos
  },
  {
    endpoint,
    name: "Fetch todo by Id",
    headers: { authorization: "token" },
    query: fetchTodoById
  },
  {
    endpoint,
    name: "Update todo by Id",
    headers: { authorization: "token" },
    query: updateTodo
  },
  {
    endpoint,
    name: "Delete todo by Id",
    headers: { authorization: "token" },
    query: deleteTodoById
  }
]
export default todoQuery
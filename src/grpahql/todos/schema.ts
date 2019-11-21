export default `
  extend type Query {
    fetchTodos: TodosResponse
    fetchTodoById(todoId: String!): TodoResponse
    deleteTodoById(todoId: String!): JSONResponse
  }
  extend type Mutation {
    createTodo(title: String!): TodoResponse
    updateTodo(todoId: String!, title: String, status: Boolean, completed: Boolean): TodoResponse
  }
  type TodosResponse {
    success: Boolean
    message: String
    data: [Todo]
  }
  type TodoResponse {
    success: Boolean
    message: String
    data: Todo
  }
  type Todo {
    todoId: String
    user: User
    title: String
    completed: Boolean
    createdAt: DateTime
    isDeleted: Boolean
  }
`
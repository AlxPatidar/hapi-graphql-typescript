import { IContext } from "@utils/types/request"
import TodoController from "./TodoController"

const todoController: TodoController = new TodoController();

export default {
  Query: {
    // Fetch todo list with authentication only authenticate user can see it
    fetchTodos: async (_: any, args: any, { isAuth, message, user }: IContext) => {
      if (!isAuth) {
        return { success: isAuth, message, data: user }
      }
      return todoController.getTodoList()
    },
    // Fetch todo item
    fetchTodoById: async (_: any, args: any, { isAuth, message, user }: IContext) => {
      if (!isAuth) {
        return { success: isAuth, message, data: user }
      }
      return todoController.getTodoById(args.todoId)
    },
    deleteTodoById: async (_: any, args: any, { isAuth, message, user }: IContext) => {
      if (!isAuth) {
        return { success: isAuth, message, data: user }
      }
      return todoController.deleteTodo(args.todoId)
    },
  },
  Mutation: {
    // Created todo item
    createTodo: async (_: any, args: any, { isAuth, message, user }: IContext) => {
      if (!isAuth) {
        return { success: isAuth, message, data: user }
      }
      return todoController.createTodo(args, user)
    },
    // Update todo item with todoId and other arguments
    updateTodo: async (_: any, args: any, { isAuth, message, user }: IContext) => {
      if (!isAuth) {
        return { success: isAuth, message, data: user }
      }
      return todoController.updateTodo(args.todoId, args)
    }
  }
}
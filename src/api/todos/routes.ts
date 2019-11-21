import * as Hapi from "hapi";
import TodoController from './TodoController';
import * as Validate from './requestValidation';
import Config from '@config/index';
import Logger from '@utils/Logger';
import IRoute from '@utils/types/route';

const todoController: TodoController = new TodoController();
const routePrefix = Config.app.routePrefix
export default class TodoRoutes implements IRoute {
  // Register promise array for routes promise array
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise(resolve => {
      Logger.info('🛫  Register Todos Routes\n');
      server.route([
        {
          method: 'POST',
          path: `${routePrefix}/todos`,
          options: {
            handler: todoController.createTodo,
            validate: Validate.createTodo,
            description: 'Method that creates a new user.',
            tags: ['api', 'todos'],
            auth: false,
          },
        },
        {
          method: 'PUT',
          path: `${routePrefix}/todos/{todoId}`,
          options: {
            handler: todoController.updateTodo,
            validate: Validate.updateTodo,
            description: 'Method that updates a todo by its id.',
            tags: ['api', 'todos'],
            auth: false,
          },
        },
        {
          method: 'GET',
          path: `${routePrefix}/todos/{todoId}`,
          options: {
            handler: todoController.getTodoById,
            validate: Validate.getTodoById,
            description: 'Method that get a todo by its id.',
            tags: ['api', 'todos'],
            auth: false,
          },
        },
        {
          method: 'GET',
          path: `${routePrefix}/todos`,
          options: {
            handler: todoController.getTodoList,
            description: 'Method that gets all todo list.',
            tags: ['api', 'todos'],
            auth: false,
          },
        },
        {
          method: 'DELETE',
          path: `${routePrefix}/todos/{todoId}`,
          options: {
            handler: todoController.deleteTodo,
            validate: Validate.deleteTodoById,
            description: 'Method that deletes a todo item by its id.',
            tags: ['api', 'todos'],
            auth: false,
          },
        },
      ]);
      resolve();
    });
  }
}

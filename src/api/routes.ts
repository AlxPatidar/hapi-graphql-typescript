import * as Hapi from 'hapi';
import TodoRoutes from './todos/routes';

export default class Router {
  // Fetch all routes and register then with server with call register method
  public static async registerRoutes(server: Hapi.Server): Promise<any> {
    await new TodoRoutes().register(server);
  }
}
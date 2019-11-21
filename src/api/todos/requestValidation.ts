import * as Joi from "joi";

// Validate create todo on payload
export const createTodo: any = {
  payload: {
    userId: Joi.string()
      .required()
      .error(new Error("User Id is required")),
    title: Joi.string()
      .required()
      .error(new Error("Task is required")),
  }
}
// Validate update todo on params and payload
export const updateTodo: any = {
  params: {
    todoId: Joi.string()
      .required()
      .error(new Error("Todo Id is required")),
  },
  payload: {
    completed: Joi.boolean().optional()
  },
}
// Validate todo params
export const getTodoById: any = {
  params: {
    todoId: Joi.string()
      .required()
      .error(new Error("Todo Id is required")),
  },
}
// Validate todo Id
export const deleteTodoById: any = {
  params: {
    todoId: Joi.string()
      .required()
      .error(new Error("Todo Id is required")),
  }
}

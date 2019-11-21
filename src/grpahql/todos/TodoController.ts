import mongoose from "mongoose";
import * as _ from "lodash";
import { ITodo, Todo } from "@models/Todo";
import { IUser } from "@models/User";

export default class TaskController {
  // Create todo with payload { title and userId }
  public async createTodo(payload: any, user: IUser) {
    try {
      const todo: ITodo | any = await Todo.create({
        ...payload,
        userId: user._id
      })
      return {
        success: true,
        message: "Todo create successfully.",
        data: {
          ...todo._doc,
          todoId: todo._id,
          user
        }
      }
    } catch (e) {
      return {
        success: false,
        message: "Invalid Request.",
        data: []
      }
    }
  }
  // Update todo
  public async updateTodo(todoId: string, payload: any) {
    try {
      const todo: ITodo | null = await Todo.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(todoId) },
        { $set: payload },
        { new: true }
      )
      return {
        status: true,
        message: "Todo updated successfully.",
        data: todo
      }
    } catch (error) {
      return {
        status: false,
        message: "Invalid Request.",
        data: []
      }
    }
  }
  // Delete todo from database with given Id
  public async deleteTodo(todoId: string) {
    const deletedTodo = await Todo.findOneAndUpdate(
      { _id: todoId },
      { $set: { isDeleted: true } },
      { new: true }
    );
    if (deletedTodo) {
      return {
        success: true,
        message: "Todo item deleted successfully.",
        data: []
      };
    } else {
      return {
        success: false,
        message: "Invalid Request.",
        data: []
      };
    }
  }
  // Fetch todo item with given Id
  public async getTodoById(todoId: string) {
    try {
      const todo = await Todo.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(todoId), isDeleted: false } },
        {
          $lookup: {
            from: "users",
            let: { userId: "$userId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
              {
                $project: {
                  name: "$name", serId: "$_id", _id: 0, email: "$email", address: "$address", role: "$role",
                  username: "$username", profilePicture: "$profilePicture", occupation: "$occupation"
                }
              }],
            as: "user"
          }
        },
        {
          $project: {
            title: "$title",
            createdAt: "$createdAt",
            completed: "$completed",
            todoId: { $toString: "$_id" }, _id: 0,
            user: { $arrayElemAt: ["$user", 0] }
          }
        }
      ])
      return {
        success: true,
        message: "Todo information fetch successfully.",
        data: _.get(todo, "[0]", [])
      };
    } catch (error) {
      return {
        success: true,
        message: error,
        data: []
      };
    }
  }
  // Fetch all todo list
  public async getTodoList() {
    try {
      const tasks = await Todo.aggregate([
        { $match: { isDeleted: false } },
        {
          $lookup: {
            from: "users",
            let: { userId: "$userId" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
            {
              $project: {
                name: "$name",
                userId: "$_id", _id: 0, username: "$username", profilePicture: "$profilePicture", role: "$role",
                occupation: "$occupation", email: "$email", address: "$address"
              }
            }],
            as: "user"
          }
        },
        {
          $project: {
            title: "$title", createdAt: "$createdAt",
            completed: "$completed", todoId: { $toString: "$_id" },
            _id: 0, user: { $arrayElemAt: ["$user", 0] }
          }
        }
      ]);
      return {
        success: true,
        message: "Todo list fetch successfully..",
        data: tasks ? tasks : []
      };
    } catch (error) {
      return {
        success: true,
        message: error,
        data: []
      };
    }
  }
}
import * as Mongoose from "mongoose";

export interface ITodo extends Mongoose.Document {
  title: string;
  userId: string;
  completed: boolean;
  status: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// create a schema
export const todoSchema = new Mongoose.Schema(
  {
    userId: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: "" },
    completed: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
  },
  {
    // This is for hide _v key form collection
    // Automatically include createdAt and updatedAt field
    timestamps: true,
    versionKey: false
  }
);

export const Todo = Mongoose.model<ITodo>("Todo", todoSchema);
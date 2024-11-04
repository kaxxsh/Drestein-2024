import {getAllTodos, createTodo, updateTodo, deleteTodo,getById} from "../controller/todoController.js";
import Express from "express";

const todoRouter = Express.Router();

todoRouter.route("/todos").get(getAllTodos).post(createTodo);
todoRouter.route("/todos/:id").put(updateTodo).delete(deleteTodo).get(getById);

export default todoRouter;
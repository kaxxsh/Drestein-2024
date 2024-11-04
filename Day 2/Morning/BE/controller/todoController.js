import mongoose from "mongoose";
import todoSchema from "../models/todoSchema.js";

const getAllTodos = async (req, res) => {
  try {
    const todos = await todoSchema.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No todo with that id");
  }

  try {
    const todo = await todoSchema.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  const todo = req.body;
  const newTodo = new todoSchema(todo);

  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  const { id: _id } = req.params;
  const todo = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No todo with that id");
  }

  try {
    const updatedTodo = await todoSchema.findByIdAndUpdate(
      _id,
      { ...todo, _id },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No todo with that id");
  }

  try {
    const deletedTodo = await todoSchema.findByIdAndDelete({ _id: id });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllTodos, createTodo, updateTodo, deleteTodo, getById };
